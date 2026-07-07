"use client";

import { useId, useState } from "react";

type CreedAccordionProps = {
  buttonLabelClosed: string;
  buttonLabelOpen: string;
  creed: readonly string[];
};

export function CreedAccordion({
  buttonLabelClosed,
  buttonLabelOpen,
  creed,
}: CreedAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="pt-2">
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-church-accent/50 px-4 text-sm font-medium text-church-accent transition-colors hover:border-church-accent hover:bg-church-accentSoft focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
        {isOpen ? buttonLabelOpen : buttonLabelClosed}
      </button>

      <div
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        id={contentId}
      >
        <div className="overflow-hidden">
          <div className="mt-4 max-w-3xl border-l-2 border-church-border pl-5 text-base leading-8 text-church-muted">
            {creed.map((paragraph) => (
              <p className="mb-4 last:mb-0" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
