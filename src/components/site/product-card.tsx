"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN, type ProductPlan } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function ProductCard({
  product,
  index,
}: {
  product: ProductPlan;
  index: number;
}) {
  const { add, open } = useCart();
  const { t, lang } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);

  const data = product[lang];

  const handleAdd = () => {
    add(product);
    toast.success(t.store.addedToastTitle, {
      description: data.name,
      action: { label: t.store.viewCartBtn, onClick: () => open() },
    });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-clay/20 bg-ink-2 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-clay/60 hover:shadow-[0_12px_30px_rgba(0,229,255,0.15)] sm:p-5">
      <span className="pointer-events-none absolute right-4 top-3 z-10 display text-4xl font-bold text-ink drop-shadow-sm transition-colors group-hover:text-clay/20">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink">
        <img
          src={product.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100 mix-blend-screen"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-ink/90 border border-clay/20 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-clay backdrop-blur">
          MXN {lang === "es" ? "+ IVA" : "+ TAX"}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <h3 className="display text-xl font-bold leading-snug text-cream-paper">
          {data.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.85rem] leading-relaxed text-cream-paper/60 font-mono">
          {data.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="display text-2xl font-bold text-clay">
              {formatMXN(product.priceMXN)}
            </p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream-paper/40 mt-1">
              MXN · {lang === "es" ? "+ IVA" : "+ TAX"}
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-clay/80 transition-colors hover:text-clay"
              >
                {t.store.cardDetails}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </DialogTrigger>
            
            <DialogContent className="max-h-[92dvh] w-[95vw] max-w-2xl overflow-y-auto overflow-x-hidden rounded-xl border border-clay/30 bg-ink-2 p-0 sm:w-full [&>button]:right-4 [&>button]:top-4 [&>button]:z-50 [&>button]:rounded-md [&>button]:bg-ink [&>button]:border [&>button]:border-clay/20 [&>button]:p-1.5 [&>button]:text-clay [&>button]:shadow-sm shadow-[0_0_50px_rgba(0,229,255,0.1)]">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="bg-ink p-6 border-b md:border-b-0 md:border-r border-clay/10">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink">
                    <img
                      src={product.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover opacity-80 mix-blend-screen"
                    />
                  </div>
                  <DialogTitle className="display mt-5 text-2xl font-bold leading-tight text-cream-paper">
                    {data.name}
                  </DialogTitle>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-cream-paper/70 font-mono">
                    {data.description}
                  </p>
                </div>
                <div className="flex flex-col p-6">
                  <p className="eyebrow text-clay">{t.store.cardIncludes}</p>
                  <ul className="mt-4 flex-1 space-y-3">
                    {data.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[0.85rem] text-cream-paper/90 font-mono">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-sm bg-clay/10 text-clay border border-clay/30">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-clay/20 pt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cream-paper/50 font-bold">
                        {t.store.cardTotalIva}
                      </span>
                      <span className="display text-2xl font-bold text-cream-paper">
                        {formatMXN(product.priceMXN)} <span className="text-lg text-clay">MXN</span>
                      </span>
                    </div>
                    <Button
                      className="mt-4 w-full bg-clay text-ink hover:bg-cream-paper hover:text-ink rounded-md font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                      size="lg"
                      onClick={() => {
                        handleAdd();
                        setDialogOpen(false);
                      }}
                    >
                      {t.store.cardHire}
                      <Plus className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button onClick={handleAdd} className="mt-5 w-full bg-ink border border-clay/30 text-clay hover:bg-clay hover:text-ink rounded-md transition-all">
          {t.store.cardHire}
          <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </article>
  );
}