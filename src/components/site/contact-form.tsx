"use client";

import {
  useState,
  FormEvent,
  ChangeEvent,
  ReactNode,
} from "react";

import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { processContact } from "@/app/actions/contact";

// ======================================================
// ANTI-SPAM
// ======================================================

const INVALID_PHONE_PATTERNS = [
  "0000000000",
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444",
  "5555555555",
  "6666666666",
  "7777777777",
  "8888888888",
  "9999999999",
  "1234567890",
  "0987654321",
];

// ======================================================
// VALIDACIONES
// ======================================================

function isGibberishText(text: string): boolean {
  const clean = text.trim();

  if (clean.length < 2) {
    return true;
  }

  // No permitir URLs en el nombre
  if (/https?:\/\//i.test(clean)) {
    return true;
  }

  const words = clean.split(/\s+/);

  return words.some(
    (word) =>
      word.length > 6 &&
      !/[aeiouáéíóúy]/i.test(word)
  );
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 10) {
    return false;
  }

  if (INVALID_PHONE_PATTERNS.includes(digits)) {
    return false;
  }

  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
    email.trim()
  );
}

// ======================================================
// TIPOS
// ======================================================

type Fields =
  | "nombre"
  | "correo"
  | "telefono"
  | "asunto"
  | "mensaje"
  | "website_hp";

type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "",
  correo: "",
  telefono: "",
  asunto: "",
  mensaje: "",
  website_hp: "",
};

// ======================================================
// FIELD
// ======================================================

interface FieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  className?: string;
}

function Field({
  label,
  children,
  error,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-clay">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-wide text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

// ======================================================
// COMPONENTE
// ======================================================

export function ContactForm() {
  const { t, lang } = useLanguage();

  const [form, setForm] =
    useState<FormState>(EMPTY);

  const [errors, setErrors] =
    useState<Partial<FormState>>({});

  const [loading, setLoading] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  // ======================================================
  // ACTUALIZAR CAMPOS
  // ======================================================

  const update = (
    key: Fields,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    }
  };

  // ======================================================
  // TELÉFONO
  // ======================================================

  const handlePhoneChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    const digitsOnly = rawValue
      .replace(/\D/g, "")
      .slice(0, 10);

    update("telefono", digitsOnly);
  };

  // ======================================================
  // VALIDACIÓN
  // ======================================================

  const validate = () => {
    const newErrors: Partial<FormState> = {};

    // Nombre
    if (
      !form.nombre.trim() ||
      isGibberishText(form.nombre)
    ) {
      newErrors.nombre =
        t.contact.errName;
    }

    // Correo
    if (!isValidEmail(form.correo)) {
      newErrors.correo =
        t.contact.errEmail;
    }

    // Teléfono
    if (!isValidPhone(form.telefono)) {
      newErrors.telefono =
        lang === "es"
          ? "Teléfono inválido (10 dígitos)"
          : "Invalid phone (10 digits)";
    }

    // Mensaje
    if (
      !form.mensaje.trim() ||
      form.mensaje.trim().length < 5
    ) {
      newErrors.mensaje =
        t.contact.errMsg;
    }

    // No permitir URLs en mensaje
    if (
      /https?:\/\//i.test(form.mensaje)
    ) {
      newErrors.mensaje =
        lang === "es"
          ? "No se permiten enlaces"
          : "Links are not allowed";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ======================================================
  // ENVIAR FORMULARIO
  // ======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    console.log(
      "===== CONTACT FORM ====="
    );

    console.log(
      "Honeypot:",
      form.website_hp
    );

    // ====================================================
    // HONEYPOT
    // ====================================================

    if (form.website_hp.trim() !== "") {
      console.warn(
        "🚫 Formulario bloqueado por honeypot."
      );

      /*
       * Simulamos éxito para no indicarle
       * al bot que fue detectado.
       */

      setSent(true);

      setTimeout(() => {
        setSent(false);
        setForm(EMPTY);
      }, 4000);

      return;
    }

    // ====================================================
    // VALIDACIÓN
    // ====================================================

    if (!validate()) {
      toast.error(
        t.contact.toastTitle,
        {
          description:
            t.contact.toastDesc,
        }
      );

      return;
    }

    setLoading(true);

    try {
      // Quitamos el honeypot antes de
      // mandar los datos al servidor.

      const {
        website_hp,
        ...payload
      } = form;

      console.log(
        "📤 Ejecutando processContact:",
        payload
      );

      const result =
        await processContact({
          form: payload,
          lang,
        });

      console.log(
        "📨 Resultado processContact:",
        result
      );

      // ==================================================
      // ÉXITO
      // ==================================================

      if (result.success) {
        setSent(true);

        setForm(EMPTY);

        toast.success(
          t.contact.sentToastTitle,
          {
            description:
              t.contact.sentToastDesc,
          }
        );

        return;
      }

      // ==================================================
      // ERROR DEL SERVIDOR
      // ==================================================

      console.error(
        "❌ processContact respondió con error:",
        result
      );

      toast.error("Error", {
        description:
          result.error ||
          (lang === "es"
            ? "Ocurrió un problema al enviar el mensaje."
            : "There was a problem sending your message."),
      });
    } catch (error) {
      // ==================================================
      // EXCEPCIÓN
      // ==================================================

      console.error(
        "❌ Error ejecutando processContact:",
        error
      );

      toast.error("Error", {
        description:
          lang === "es"
            ? "No fue posible enviar el mensaje. Inténtalo nuevamente."
            : "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // MENSAJE DE ÉXITO
  // ======================================================

  if (sent) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-xl border border-clay/20 bg-ink-2 p-10 text-center shadow-[0_0_30px_rgba(0,229,255,0.05)]">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-clay text-ink shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          <Check
            className="h-7 w-7"
            strokeWidth={3}
          />
        </span>

        <h3 className="display mt-6 text-3xl font-bold text-cream-paper">
          {t.contact.successTitle}
        </h3>

        <p className="mt-3 max-w-sm font-mono text-sm text-cream-paper/60">
          {t.contact.successDesc}
        </p>

        <Button
          className="mt-8 border border-clay/30 bg-ink text-clay transition-colors hover:bg-clay hover:text-ink"
          onClick={() => {
            setForm(EMPTY);
            setErrors({});
            setSent(false);
          }}
        >
          {t.contact.sendAnother}
        </Button>
      </div>
    );
  }

  // ======================================================
  // FORMULARIO
  // ======================================================

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-xl border border-clay/20 bg-ink-2 p-6 shadow-[0_0_30px_rgba(0,229,255,0.05)] sm:p-9"
    >
      <div className="absolute left-0 top-0 h-1 w-full rounded-t-xl bg-gradient-to-r from-clay to-ochre" />

      {/* ==================================================
          HONEYPOT OCULTO
         ================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        <label htmlFor="company_website_contact">
          Leave this field empty
        </label>

        <input
          id="company_website_contact"
          type="text"
          name="company_website_contact"
          tabIndex={-1}
          autoComplete="new-password"
          value={form.website_hp}
          onChange={(event) =>
            update(
              "website_hp",
              event.target.value
            )
          }
        />
      </div>

      {/* ==================================================
          CAMPOS
         ================================================== */}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* NOMBRE */}

        <Field
          label={t.contact.fullName}
          error={errors.nombre}
        >
          <Input
            className="border-clay/30 bg-ink text-cream-paper focus-visible:border-clay focus-visible:ring-clay"
            value={form.nombre}
            onChange={(event) =>
              update(
                "nombre",
                event.target.value
              )
            }
            placeholder={
              t.contact.namePlaceholder
            }
          />
        </Field>

        {/* CORREO */}

        <Field
          label={t.contact.email}
          error={errors.correo}
        >
          <Input
            className="border-clay/30 bg-ink text-cream-paper focus-visible:border-clay focus-visible:ring-clay"
            type="email"
            value={form.correo}
            onChange={(event) =>
              update(
                "correo",
                event.target.value
              )
            }
            placeholder={
              t.contact.emailPlaceholder
            }
          />
        </Field>

        {/* TELÉFONO */}

        <Field
          label={t.contact.phone}
          error={errors.telefono}
        >
          <Input
            className="border-clay/30 bg-ink text-cream-paper focus-visible:border-clay focus-visible:ring-clay"
            type="tel"
            inputMode="numeric"
            value={form.telefono}
            onChange={
              handlePhoneChange
            }
            placeholder={
              t.contact.phonePlaceholder
            }
            maxLength={10}
          />
        </Field>

        {/* ASUNTO */}

        <Field
          label={t.contact.subject}
        >
          <Input
            className="border-clay/30 bg-ink text-cream-paper focus-visible:border-clay focus-visible:ring-clay"
            value={form.asunto}
            onChange={(event) =>
              update(
                "asunto",
                event.target.value
              )
            }
            placeholder={
              t.contact.subjectPlaceholder
            }
          />
        </Field>

        {/* MENSAJE */}

        <Field
          label={t.contact.message}
          error={errors.mensaje}
          className="sm:col-span-2"
        >
          <Textarea
            className="resize-none border-clay/30 bg-ink text-cream-paper focus-visible:border-clay focus-visible:ring-clay"
            value={form.mensaje}
            onChange={(event) =>
              update(
                "mensaje",
                event.target.value
              )
            }
            placeholder={
              t.contact.msgPlaceholder
            }
            rows={6}
          />
        </Field>
      </div>

      {/* ==================================================
          BOTÓN
         ================================================== */}

      <Button
        type="submit"
        size="lg"
        className="mt-7 w-full bg-clay font-bold text-ink shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all hover:bg-cream-paper"
        disabled={loading}
      >
        {loading ? (
          <>
            {t.contact.sending}

            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {t.contact.submitBtn}

            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}