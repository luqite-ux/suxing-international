import { NextResponse } from "next/server";
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from "@/lib/inquiry-captcha";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const values = contentType.includes("application/json")
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());
  const getValue = (key: string) => String(values[key] ?? "").trim();
  const secret = process.env.CAPTCHA_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Inquiry service is temporarily unavailable." }, { status: 503 });
  }

  try {
    const { store, tenantId, siteScope } = createSupabaseCaptchaContextFromEnv();
    const captcha = await verifyCaptchaSubmission({
      secret, store, tenantId, siteScope,
      scope: getValue("captchaScope"),
      token: getValue("captchaToken"),
      answer: getValue("captchaAnswer"),
    });
    if (!captcha.ok) {
      return NextResponse.json({ ok: false, error: "Invalid or expired CAPTCHA. Please refresh and try again." }, { status: 400 });
    }
  } catch (error) {
    console.error("[inquiries] CAPTCHA verification failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: "Inquiry service is temporarily unavailable." }, { status: 503 });
  }

  const email = getValue("email");
  const name = getValue("name");
  const message = getValue("message");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email, and project details are required." }, { status: 400 });
  }

  if (!supabaseUrl || !serviceKey || !tenantId) {
    return NextResponse.json({ ok: false, error: "Inquiry storage is not configured yet." }, { status: 503 });
  }

  const payload = {
    tenant_id: tenantId,
    name,
    email,
    phone: getValue("phone"),
    company: getValue("company"),
    subject: getValue("subject") || "General B2B apparel manufacturing inquiry",
    message: [
      message,
      getValue("quantity") ? `Program details: ${getValue("quantity")}` : ""
    ].filter(Boolean).join("\n\n"),
    status: "unread"
  };

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "Inquiry storage failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
