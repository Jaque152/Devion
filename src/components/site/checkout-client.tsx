"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";
import { processCheckout, type CheckoutFormState, type CheckoutItem } from "@/app/actions/checkout";

// Forzamos que los campos requeridos coincidan estrictamente con la interfaz del servidor
const REQUIRED: (keyof CheckoutFormState)[] = [
  "nombre",
  "apellidos",
  "email",
  "telefono",
  "direccion",
  "ciudad",
  "estado",
  "cp",
  "card",
  "cardName",
  "exp",
  "cvc",
];

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink/60">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[0.64rem] uppercase tracking-wide text-clay">
          {error}
        </p>
      )}
    </div>
  );
}

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-[0.66rem] text-cream-paper">
        {n}
      </span>
      <h2 className="display text-xl font-semibold text-ink">{title}</h2>
    </div>
  );
}

const inputBase =
  "flex h-12 w-full rounded-xl border-[1.5px] border-ink/15 bg-cream-paper px-4 text-[0.95rem] text-ink transition-all focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15";

export function CheckoutClient() {
  const { items, subtotal, iva, total, hydrated, setQty, remove, clear } = useCart();
  const { t, lang } = useLanguage();
  
  const [form, setForm] = useState<Partial<CheckoutFormState>>({ pais: "México" });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{ no: string; total: number } | null>(null);

  const update = (k: keyof CheckoutFormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const fmtCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validate = () => {
    const e: Partial<Record<keyof CheckoutFormState, string>> = {};
    for (const k of REQUIRED) if (!form[k]?.trim()) e[k] = t.checkout.requiredErr;
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = t.checkout.invalidEmail;
    if (form.cp && !/^\d{5}$/.test(form.cp)) e.cp = t.checkout.digits5;
    if (form.card && form.card.replace(/\s/g, "").length < 15)
      e.card = t.checkout.incompleteNum;
    if (form.exp && !/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = "MM/AA";
    if (form.cvc && !/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (items.length === 0) return;
    
    if (!validate()) {
      toast(t.checkout.toastReview, {
        description: t.checkout.toastReviewDesc,
      });
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    setLoading(true);

    // Mapeamos estrictamente los items a la interfaz que espera el servidor (eliminando el uso de `any`)
    const checkoutItems: CheckoutItem[] = items.map((i) => ({
      product: {
        id: i.product.id,
        priceMXN: i.product.priceMXN,
        es: { name: i.product.es.name },
        en: { name: i.product.en.name },
      },
      qty: i.qty,
    }));

    const result = await processCheckout({
      form: form as CheckoutFormState,
      items: checkoutItems,
      totals: { subtotal, iva, total },
      lang: lang as "es" | "en",
    });

    setLoading(false);

    if (result.success) {
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
        return;
      }
      
      setOrder({ no: result.orderId!, total });
      clear();
      toast(t.checkout.toastConfirmed, { description: `${t.checkout.toastFolio} ${result.orderId}` });
      
    } else {
      toast.error("Error en el pago", { description: result.error });
    }
  };

  if (order) {
    return (
      <div className="mx-auto max-w-2xl container-px py-20 text-center sm:py-28">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-clay text-cream-paper">
          <Check className="h-9 w-9" />
        </span>
        <h1 className="display mt-8 text-4xl font-semibold text-ink sm:text-5xl">
          {t.checkout.successThankYou}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {t.checkout.successDesc}
        </p>
        <div className="mx-auto mt-9 max-w-sm rounded-2xl border border-ink/10 bg-cream-paper p-6">
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              {t.checkout.folioLabel}
            </span>
            <span className="font-mono text-sm font-semibold text-ink">
              {order.no}
            </span>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              {t.checkout.totalPaid}
            </span>
            <span className="display text-2xl font-semibold text-clay">
              {formatMXN(order.total)} MXN
            </span>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/servicios">{t.checkout.exploreMore}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">{t.checkout.backHome}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center container-px py-24 text-center sm:py-32">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-ink/25 text-ink/40">
          <ShoppingBag className="h-8 w-8" />
        </span>
        <h1 className="display mt-7 text-4xl font-semibold text-ink">
          {t.checkout.emptyTitle}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t.checkout.emptyDesc}
        </p>
        <Button asChild className="mt-8">
          <Link href="/servicios">
            {t.checkout.viewServices}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] container-px py-12 sm:py-16">
      <div className="mb-10">
        <span className="eyebrow inline-flex items-center gap-2.5 text-ink/60">
          <span className="h-2 w-2 rounded-full bg-clay" />
          {t.checkout.eyebrow}
        </span>
        <h1 className="display mt-5 text-4xl font-black uppercase leading-none text-ink sm:text-6xl">
          {t.checkout.title}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12"
      >
        <div className="space-y-8">
          <div className="rounded-[1.4rem] border border-ink/10 bg-cream-paper p-6 sm:p-8">
            <SectionTitle n="01" title={t.checkout.contactSec} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.checkout.name} error={errors.nombre}>
                <Input
                  data-error={!!errors.nombre}
                  value={form.nombre || ""}
                  onChange={(e) => update("nombre", e.target.value)}
                  placeholder={t.checkout.name}
                />
              </Field>
              <Field label={t.checkout.lastName} error={errors.apellidos}>
                <Input
                  value={form.apellidos || ""}
                  onChange={(e) => update("apellidos", e.target.value)}
                  placeholder={t.checkout.lastName}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="tu@correo.com"
                />
              </Field>
              <Field label={t.contact.phone} error={errors.telefono}>
                <Input
                  value={form.telefono || ""}
                  onChange={(e) => update("telefono", e.target.value)}
                  placeholder="+52 ..."
                />
              </Field>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-ink/10 bg-cream-paper p-6 sm:p-8">
            <SectionTitle n="02" title={t.checkout.billingSec} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.checkout.company}>
                <Input
                  value={form.empresa || ""}
                  onChange={(e) => update("empresa", e.target.value)}
                  placeholder={t.checkout.companyPlaceholder}
                />
              </Field>
              <Field label={t.checkout.rfc}>
                <Input
                  value={form.rfc || ""}
                  onChange={(e) => update("rfc", e.target.value.toUpperCase())}
                  placeholder="XAXX010101000"
                />
              </Field>
              <Field
                label={t.checkout.address}
                error={errors.direccion}
                className="sm:col-span-2"
              >
                <Input
                  value={form.direccion || ""}
                  onChange={(e) => update("direccion", e.target.value)}
                  placeholder={t.checkout.addressPlaceholder}
                />
              </Field>
              <Field label={t.checkout.city} error={errors.ciudad}>
                <Input
                  value={form.ciudad || ""}
                  onChange={(e) => update("ciudad", e.target.value)}
                  placeholder={t.checkout.city}
                />
              </Field>
              <Field label={t.checkout.state} error={errors.estado}>
                <Input
                  value={form.estado || ""}
                  onChange={(e) => update("estado", e.target.value)}
                  placeholder={t.checkout.state}
                />
              </Field>
              <Field label={t.checkout.zip} error={errors.cp}>
                <Input
                  value={form.cp || ""}
                  onChange={(e) =>
                    update("cp", e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                  placeholder="06700"
                  inputMode="numeric"
                />
              </Field>
              <Field label={t.checkout.country}>
                <select
                  value={form.pais || "México"}
                  onChange={(e) => update("pais", e.target.value)}
                  className={inputBase}
                >
                  <option>México</option>
                  <option>Estados Unidos</option>
                  <option>Colombia</option>
                  <option>Argentina</option>
                  <option>España</option>
                </select>
              </Field>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-ink/10 bg-cream-paper p-6 sm:p-8">
            <SectionTitle n="03" title={t.checkout.paymentSec} />
            
            <div className="mb-5 flex items-center justify-between gap-2 rounded-xl bg-sand/60 px-4 py-3 text-[0.78rem] text-ink/70">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 shrink-0 text-clay" />
                Pago encriptado y seguro
              </div>
              <img 
                src="/logo-keycop-2.png" 
                alt="Procesado por Keycop Payments" 
                className="h-[30px] object-contain opacity-80 mix-blend-multiply" 
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t.checkout.cardNumber}
                error={errors.card}
                className="sm:col-span-2"
              >
                <Input
                  value={form.card || ""}
                  onChange={(e) => update("card", fmtCard(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />
              </Field>
              <Field
                label={t.checkout.cardName}
                error={errors.cardName}
                className="sm:col-span-2"
              >
                <Input
                  value={form.cardName || ""}
                  onChange={(e) => update("cardName", e.target.value)}
                  placeholder={t.checkout.cardNamePlaceholder}
                />
              </Field>
              <Field label={t.checkout.exp} error={errors.exp}>
                <Input
                  value={form.exp || ""}
                  onChange={(e) => update("exp", fmtExp(e.target.value))}
                  placeholder="MM/AA"
                  inputMode="numeric"
                />
              </Field>
              <Field label="CVV" error={errors.cvc}>
                <Input
                  type="password"
                  value={form.cvc || ""}
                  onChange={(e) =>
                    update("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="***"
                  inputMode="numeric"
                />
              </Field>
              <Field label={t.checkout.notes} className="sm:col-span-2">
                <Textarea
                  value={form.notas || ""}
                  onChange={(e) => update("notas", e.target.value)}
                  placeholder={t.checkout.notesPlaceholder}
                  rows={3}
                />
              </Field>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="ink-panel rounded-[1.4rem] p-7 text-cream-paper">
            <p className="eyebrow text-clay">{t.checkout.summaryEyebrow}</p>

            <div className="mt-6 max-h-[340px] space-y-4 overflow-y-auto pr-1">
              {items.map(({ product, qty }) => {
                const data = product[lang];
                
                return (
                  <div key={product.id} className="flex gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-cream-paper/[0.08]">
                       <img src={product.imageUrl} alt={data.name} className="h-full w-full object-cover opacity-80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-cream-paper">
                        {data.name}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-cream-paper/15">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="grid h-6 w-6 place-items-center text-cream-paper/60 hover:text-clay"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center font-mono text-xs">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="grid h-6 w-6 place-items-center text-cream-paper/60 hover:text-clay"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-mono text-xs text-cream-paper/80">
                          {formatMXN(product.priceMXN * qty)} MXN <span className="text-[0.55rem] text-cream-paper/50">+ IVA</span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="self-start text-cream-paper/35 hover:text-clay"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <dl className="mt-6 space-y-2 border-t border-cream-paper/10 pt-5 font-mono text-sm">
              <div className="flex justify-between text-cream-paper/60">
                <dt>{t.cart.subtotal}</dt>
                <dd>{formatMXN(subtotal)} MXN</dd>
              </div>
              <div className="flex justify-between text-cream-paper/60">
                <dt>IVA ({Math.round(IVA_RATE * 100)}%)</dt>
                <dd>{formatMXN(iva)} MXN</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-cream-paper/10 pt-3">
                <dt className="display text-base font-semibold text-cream-paper">
                  {t.cart.total}
                </dt>
                <dd className="display text-2xl font-semibold text-clay">
                  {formatMXN(total)} MXN
                </dd>
              </div>
            </dl>

            <Button
              type="submit"
              variant="cream"
              size="lg"
              className="mt-6 w-full"
              disabled={loading || items.length === 0}
            >
              {loading ? (
                <>
                  {t.checkout.processing}
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  {t.checkout.placeOrder}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-cream-paper/40">
              <Lock className="h-3 w-3" />
              {t.checkout.protected}
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
