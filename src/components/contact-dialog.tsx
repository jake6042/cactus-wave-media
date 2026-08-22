"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { XIcon } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { ContactForm } from "@/components/contact-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ContactDialogContextValue = {
  open: boolean;
  openContact: () => void;
  closeContact: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(
  null,
);

function clearContactHash() {
  if (window.location.hash !== "#contact") return;
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => {
    setOpen(false);
    clearContactHash();
  }, []);

  const onOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) clearContactHash();
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#contact") setOpen(true);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const value = useMemo(
    () => ({ open, openContact, closeContact }),
    [open, openContact, closeContact],
  );

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
      <ContactCardDialog open={open} onOpenChange={onOpenChange} />
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error("useContactDialog must be used within ContactProvider");
  }
  return context;
}

export function ContactTrigger({
  href = "/#contact",
  className,
  children,
  onClick,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { openContact } = useContactDialog();

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
        openContact();
      }}
    >
      {children}
    </a>
  );
}

function ContactCardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="z-[90] top-[max(0.75rem,env(safe-area-inset-top))] w-[min(calc(100vw-1.25rem),28rem)] max-h-[min(40rem,calc(100dvh-1.5rem))] max-w-[calc(100vw-1.25rem)] translate-y-0 gap-0 overflow-y-auto overflow-x-hidden rounded-[2px] border-0 bg-bone p-0 text-ink shadow-[0_40px_90px_rgba(0,0,0,0.55)] ring-1 ring-brass/35 sm:top-1/2 sm:max-w-[28rem] sm:-translate-y-1/2"
      >
        <div className="relative px-5 pb-6 pt-6 sm:px-8 sm:pb-9 sm:pt-8">
          <span
            aria-hidden="true"
            className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brass to-transparent sm:inset-x-8"
          />

          <div className="flex items-start justify-between gap-4">
            <Wordmark surface="bone" markOnly markSize={32} />
            <DialogClose className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-ink/35 transition-colors hover:text-ink focus-visible:outline-none">
              <XIcon className="h-4 w-4" strokeWidth={1.25} />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <DialogHeader className="mt-6 gap-2 sm:mt-7">
            <DialogTitle className="font-serif text-[clamp(1.65rem,6vw,2rem)] leading-none tracking-tight text-ink">
              Start a project
            </DialogTitle>
            <DialogDescription className="max-w-[22rem] text-[13px] leading-relaxed text-ink/50">
              Name, a way to write back, and what you need. We reply like humans.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 sm:mt-7">
            <ContactForm key={open ? "open" : "closed"} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
