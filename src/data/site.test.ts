import { describe, expect, test } from "vitest";
import { buildInquirySubject, faqs, getProductBySlug, productCategories, products, siteConfig } from "./site";

const forbidden = /\b(warranty|warranties|guarantee|guaranteed)\b|质保|保修|质量保证/i;

describe("site data boundary", () => {
  test("ships English-only content with future locale metadata", () => {
    expect(siteConfig.defaultLocale).toBe("en");
    expect(siteConfig.supportedLocales).toEqual(["en"]);
    expect(siteConfig.futureLocales).toContain("zh");
    expect(siteConfig.companyName).toBe("Zhejiang Suxing Knitting Co., Ltd.");
  });

  test("does not expose price, cart, payment, or warranty-like content", () => {
    const serialized = JSON.stringify({ siteConfig, productCategories, products, faqs });

    expect(serialized).not.toMatch(/\b(price|prices|cart|checkout|payment)\b/i);
    expect(serialized).not.toMatch(forbidden);
  });

  test("looks up products by slug and builds B2B inquiry subjects", () => {
    expect(products.length).toBeGreaterThanOrEqual(40);
    const product = products[0];

    expect(getProductBySlug(product.slug)?.id).toBe(product.id);
    expect(buildInquirySubject(product)).toBe(`Inquiry for ${product.name} (${product.id})`);
    expect(buildInquirySubject()).toBe("General B2B apparel manufacturing inquiry");
  });
});
