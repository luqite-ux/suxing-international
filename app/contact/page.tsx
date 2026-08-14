import { InquiryForm } from "@/components/inquiry-form";
import { siteConfig } from "@/src/data/site";

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Contact Suxing</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Send your style reference, target quantity, material direction, size range, and destination market. The team will follow up through the submitted contact details.
        </p>
        <div className="mt-8 break-words rounded-[1.5rem] bg-white/86 p-6 shadow-airy">
          <p className="font-semibold">{siteConfig.companyName}</p>
          <p className="mt-3 text-slate-600">{siteConfig.contact.email}</p>
          <p className="mt-2 text-slate-600">{siteConfig.contact.phone}</p>
          <p className="mt-2 text-slate-600">{siteConfig.contact.address}</p>
        </div>
      </div>
      <InquiryForm />
    </main>
  );
}
