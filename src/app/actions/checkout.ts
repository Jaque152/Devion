"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OCTANO_BASE_URL = "https://pagos.octanopayments.com/api/v1";

async function safeOctanoFetch(url: string, options: RequestInit) {
  const headers = new Headers(options.headers || {});
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
  }
  if (!headers.has("Origin")) {
    headers.set("Origin", "https://Devion.com.mx");
  }

  const res = await fetch(url, { ...options, headers });
  const text = await res.text(); 

  if (text.trim().startsWith("<")) {
    throw new Error("El servidor de pagos bloqueó la conexión (WAF).");
  }
  if (!text || text.trim() === "") {
    throw new Error("Respuesta vacía o nula del servidor de pagos.");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    const lastBrace = text.lastIndexOf('}');
    if (lastBrace !== -1) {
      try { return JSON.parse(text.substring(0, lastBrace + 1)); } catch (e) {}
    }
    try { return JSON.parse(text.trim() + '}'); } catch (e) {}
    throw new Error("Error de comunicación con la pasarela de pagos.");
  }
}

export interface CheckoutFormState {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  empresa?: string;
  rfc?: string;
  direccion: string;
  ciudad: string;
  estado: string;
  cp: string;
  pais: string;
  card: string;
  cardName: string;
  exp: string;
  cvc: string;
  notas?: string;
}

export interface CheckoutItem {
  product: {
    id: string | number;
    priceMXN: number;
    es: { name: string };
    en: { name: string };
  };
  qty: number;
}

export interface CheckoutPayload {
  form: CheckoutFormState;
  items: CheckoutItem[];
  totals: {
    subtotal: number;
    iva: number;
    total: number;
  };
  lang: "es" | "en";
}

export async function processCheckout(payload: CheckoutPayload) {
  try {
    const { form, items, totals, lang } = payload;
    const orderId = `PC-${Math.floor(100000 + Math.random() * 899999)}`;
    const currentLang = lang || "es";

    const emailStr = process.env.OCTANO_EMAIL;
    const passwordStr = process.env.OCTANO_PASSWORD;

    if (!emailStr || !passwordStr) {
      throw new Error("Credenciales de la pasarela no configuradas en el servidor.");
    }

    const authData = await safeOctanoFetch(`${OCTANO_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: emailStr, password: passwordStr }),
    });

    if (!authData.authToken) throw new Error("Error de autenticación con la pasarela.");
    const token = authData.authToken;

    const expParts = form.exp.split("/");
    const cardData = {
      cardNumber: form.card.replace(/\s/g, ""),
      cardholderName: form.cardName,
      expirationMonth: expParts[0].trim(),
      expirationYear: `20${expParts[1].trim()}`,
    };

    const tokenData = await safeOctanoFetch(`${OCTANO_BASE_URL}/card/tokenizer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardData }),
    });

    if (!tokenData.cardNumberToken) throw new Error("Error al procesar la tarjeta.");

    const salePayload = {
      amount: Math.round(totals.total * 100) / 100,
      currency: 484,
      reference: orderId,
      customerInformation: {
        firstName: form.nombre,
        lastName: form.apellidos,
        email: form.email,
        phone1: form.telefono,
        city: form.ciudad,
        address1: form.direccion,
        postalCode: form.cp,
        state: form.estado,
        country: form.pais === "México" ? "Mx" : form.pais,
      },
      cardData: {
        cardNumberToken: tokenData.cardNumberToken,
        cvv: form.cvc.replace(/\s/g, ""),
      },
      items: items.map((i) => ({
        title: i.product[currentLang].name,
        amount: Math.round(i.product.priceMXN * 100) / 100,
        quantity: i.qty,
        id: String(i.product.id),
      })),
      redirectUrl: "https://devion.com.mx/checkout",
    };

    const saleData = await safeOctanoFetch(`${OCTANO_BASE_URL}/sale`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salePayload),
    });

    if (saleData.status === "DECLINED") {
      return { success: false, error: "Pago declinado. Revisa los fondos o intenta con otra tarjeta." };
    }
    
    if (saleData.status === "PENDING" && saleData.redirectTo) {
      return { success: true, redirectTo: saleData.redirectTo };
    }

    if (saleData.status !== "APPROVED") {
      return { success: false, error: "La transacción falló o fue rechazada por el banco." };
    }

    // ENVÍO DE CORREOS ESPERADO SECUENCIALMENTE
    console.log(`[Checkout] Pago aprobado. Iniciando envío de correos para orden ${orderId}`);
    await enviarCorreos(orderId, form, items, totals, currentLang);
    console.log(`[Checkout] Proceso de correos finalizado para orden ${orderId}`);

    return { success: true, orderId };
  } catch (error: unknown) {
    console.error("Checkout Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Ocurrió un error al procesar el pago.";
    return { success: false, error: errorMessage };
  }
}

async function enviarCorreos(
  orderId: string,
  form: CheckoutFormState,
  items: CheckoutItem[],
  totals: { subtotal: number; iva: number; total: number },
  lang: "es" | "en"
) {
  const adminEmail = "hola@devion.com.mx";
  const senderEmail = "Devion <hola@devion.com.mx>"; 

  const texts = {
    es: {
      subjectClient: `¡Gracias por tu pedido! Folio: ${orderId}`,
      subjectAdmin: `💰 NUEVA VENTA: ${orderId} - ${form.nombre}`,
      title: `Confirmación de Pedido: ${orderId}`,
      hello: `Hola`,
      intro: `Tu pago ha sido procesado exitosamente. Hemos recibido tu solicitud para iniciar tu proyecto digital.`,
      totalPaid: `Total Pagado:`,
      clientData: `Datos del Cliente`,
      emailLabel: `Email:`,
      phoneLabel: `Teléfono:`,
      companyLabel: `Empresa/RFC:`,
      footer: `Devion — Estudio Digital CDMX.`
    },
    en: {
      subjectClient: `Thank you for your order! Folio: ${orderId}`,
      subjectAdmin: `💰 NEW SALE: ${orderId} - ${form.nombre}`,
      title: `Order Confirmation: ${orderId}`,
      hello: `Hello`,
      intro: `Your payment has been successfully processed. We have received your request to start your digital project.`,
      totalPaid: `Total Paid:`,
      clientData: `Customer Information`,
      emailLabel: `Email:`,
      phoneLabel: `Phone:`,
      companyLabel: `Company/Tax ID:`,
      footer: `Devion — Digital Studio CDMX.`
    }
  };

  const t = texts[lang] || texts["es"];
  
  const itemsListHtml = items.map((i) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #27272A; color: #FAFAFA;">${i.qty}x ${i.product[lang].name}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #27272A; text-align: right; color: #A1A1AA;">$${(i.product.priceMXN * i.qty).toFixed(2)} MXN</td>
    </tr>
  `).join("");

  // Diseño oscuro Devion
  const emailBody = `
    <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; background-color: #0A0A0A; color: #FAFAFA; border: 1px solid #00E5FF33; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(90deg, #00E5FF 0%, #B026FF 100%); height: 4px; width: 100%;"></div>
      <div style="padding: 35px 30px;">
        <h2 style="color: #00E5FF; margin-top: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">${t.title}</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #EAEAEA;">${t.hello} <strong style="color: #00E5FF;">${form.nombre}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #A1A1AA;">${t.intro}</p>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #161616; border: 1px solid #27272A; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            ${itemsListHtml}
            <tr>
              <td style="padding: 16px 0 0 0; font-weight: bold; text-align: right; border-top: 1px dashed #3F3F46; color: #71717A; text-transform: uppercase; letter-spacing: 1px;">${t.totalPaid}</td>
              <td style="padding: 16px 0 0 0; font-weight: bold; text-align: right; color: #00E5FF; font-size: 18px; border-top: 1px dashed #3F3F46;">$${totals.total.toFixed(2)} MXN</td>
            </tr>
          </table>
        </div>

        <h3 style="margin-top: 35px; color: #FAFAFA; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">${t.clientData}</h3>
        <div style="font-size: 13px; color: #A1A1AA; line-height: 1.8; background-color: #161616; padding: 20px; border-radius: 8px; border: 1px solid #27272A;">
          <strong style="color: #71717A;">${t.emailLabel}</strong> <span style="color: #FAFAFA;">${form.email}</span><br/>
          <strong style="color: #71717A;">${t.phoneLabel}</strong> <span style="color: #FAFAFA;">${form.telefono}</span><br/>
          <strong style="color: #71717A;">${t.companyLabel}</strong> <span style="color: #FAFAFA;">${form.empresa || "N/A"} / ${form.rfc || "N/A"}</span>
        </div>

        <div style="margin-top: 45px; padding-top: 25px; border-top: 1px solid #27272A; text-align: center;">
          <p style="margin: 0; font-size: 10px; color: #71717A; text-transform: uppercase; letter-spacing: 2px;">${t.footer}</p>
        </div>
      </div>
    </div>
  `;

  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ Advertencia: RESEND_API_KEY no está configurada.");
  }

  try {
    console.log(`[Checkout Email] Enviando a cliente: ${form.email}`);
    const clientRes = await resend.emails.send({
      from: senderEmail,
      to: form.email,
      subject: t.subjectClient,
      html: emailBody,
    });
    if (clientRes.error) console.error("❌ Error Resend (Cliente):", clientRes.error);
    else console.log("✅ Correo cliente enviado exitosamente.");
  } catch (err) {
    console.error("❌ Excepción enviando a cliente:", err);
  }

  try {
    console.log(`[Checkout Email] Enviando a admin: ${adminEmail}`);
    const adminRes = await resend.emails.send({
      from: senderEmail,
      to: adminEmail,
      subject: t.subjectAdmin,
      html: `<div style="background-color: #000000; padding: 30px;">${emailBody}</div>`,
    });
    if (adminRes.error) console.error("❌ Error Resend (Admin):", adminRes.error);
    else console.log("✅ Correo admin enviado exitosamente.");
  } catch (err) {
    console.error("❌ Excepción enviando a admin:", err);
  }
}
