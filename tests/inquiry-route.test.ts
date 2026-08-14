import { afterEach, describe, expect, test, vi } from "vitest";
import { POST } from "../app/api/inquiries/route";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
});

function requestWithForm(fields: Record<string, string>) {
  const form = new URLSearchParams(fields);
  return new Request("http://localhost:3021/api/inquiries", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form
  });
}

describe("inquiry route", () => {
  test("writes valid inquiries to Supabase REST when env is configured", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";
    process.env.NEXT_PUBLIC_TENANT_ID = "tenant-123";
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]", { status: 201 }));

    const response = await POST(requestWithForm({
      subject: "General B2B apparel manufacturing inquiry",
      name: "Buyer",
      email: "buyer@example.com",
      company: "Retail Group",
      quantity: "500 pieces",
      message: "We need a custom knitwear program."
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true, stored: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/rest/v1/inquiries",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "service-key",
          Authorization: "Bearer service-key"
        })
      })
    );
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toMatchObject({
      tenant_id: "tenant-123",
      name: "Buyer",
      email: "buyer@example.com",
      company: "Retail Group",
      subject: "General B2B apparel manufacturing inquiry",
      status: "unread"
    });
  });
});
