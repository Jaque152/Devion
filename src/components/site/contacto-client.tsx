"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function ContactoClient() {
  const { t } = useLanguage();

  const DETAILS = [
    { icon: Phone, label: t.contactPage.detailsLabelPhone, value: "+52 55 9826 1186", href: "tel:+525598261186" },
    { icon: Mail, label: t.contactPage.detailsLabelEmail, value: "hola@devion.com.mx", href: "mailto:hola@devion.com.mx" },
    {
      icon: MapPin,
      label: t.contactPage.detailsLabelAddress,
      value: "Boulevard Adolfo López Mateos 2165, Interior 607A Oficina 607A-B Piso 6, Colonia Los Alpes, Alcaldía Álvaro Obregón, C.P. 01010, Ciudad de México",
      href: "#",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink min-h-screen">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00E5FF08_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-32 top-[-10%] h-[460px] w-[460px] rounded-full bg-clay/10 blur-[120px]" />
        <div className="absolute right-[-12%] top-1/2 h-[420px] w-[420px] rounded-full bg-ochre/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 container-px py-14 sm:py-20 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <div className="lg:pt-6">
          <span className="eyebrow inline-flex items-center gap-2.5 text-clay">
            <span className="h-2 w-2 rounded-sm bg-ochre" />
            {t.contactPage.eyebrow}
          </span>
          <h1 className="display mt-6 text-5xl font-bold uppercase leading-[0.95] text-cream-paper sm:text-7xl">
            {t.contactPage.titlePart1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay to-ochre">{t.contactPage.titlePart2}</span>
          </h1>
          <p className="mt-7 max-w-md text-pretty text-[0.95rem] font-mono leading-relaxed text-cream-paper/60">
            {t.contactPage.desc}
          </p>

          <Button asChild className="mt-8 bg-ink-2 border border-clay/30 text-clay hover:bg-clay hover:text-ink transition-colors">
            <Link href="/personalizado">{t.contactPage.payBtn}</Link>
          </Button>

          <div className="mt-12 space-y-5 border-t border-clay/20 pt-8">
            {DETAILS.map((d) => (
              <a
                key={d.label}
                href={d.href}
                className="group flex items-center gap-4"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md border border-clay/20 bg-ink-2 text-clay transition-all group-hover:border-clay group-hover:bg-clay group-hover:text-ink group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <d.icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream-paper/40">
                    {d.label}
                  </span>
                  <span className="text-cream-paper/90 font-medium transition-colors group-hover:text-clay font-mono text-sm mt-0.5 block">
                    {d.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
