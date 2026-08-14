"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buildInquirySubject, type Product } from "@/src/data/site";

export function InquiryForm({ product }: { product?: Product }) {
  const subject = buildInquirySubject(product);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      body: new FormData(event.currentTarget)
    });

    if (response.ok) {
      event.currentTarget.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <form id="inquiry-form" action="/api/inquiries" method="post" onSubmit={handleSubmit} className="grid min-w-0 gap-4 rounded-[2rem] border border-sky-100 bg-white/88 p-5 shadow-airy backdrop-blur sm:p-6">
      <input type="hidden" name="productId" value={product?.id ?? ""} />
      <label className="grid gap-2 text-sm font-medium text-ink">
        Inquiry Subject
        <input name="subject" defaultValue={subject} className="min-w-0 rounded-2xl border border-sky-100 bg-skyglass px-4 py-3 text-slate-800 outline-none focus:border-ocean" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Name
          <input name="name" required className="min-w-0 rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-ocean" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email
          <input name="email" type="email" required className="min-w-0 rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-ocean" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Company
          <input name="company" className="min-w-0 rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-ocean" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Quantity / Program
          <input name="quantity" className="min-w-0 rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-ocean" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Project Details
        <textarea name="message" required rows={5} className="min-w-0 rounded-2xl border border-sky-100 px-4 py-3 outline-none focus:border-ocean" />
      </label>
      <button type="submit" disabled={status === "submitting"} className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-airy transition hover:bg-ocean disabled:cursor-wait disabled:bg-slate-500">
        {status === "submitting" ? "Sending..." : "Submit Inquiry"}
        <Send className="h-4 w-4" />
      </button>
      {status === "success" ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Thank you. Your inquiry has been received and our team will follow up with you.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          The inquiry could not be sent. Please email us directly or try again in a moment.
        </p>
      ) : null}
    </form>
  );
}
