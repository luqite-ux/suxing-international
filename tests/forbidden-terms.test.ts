import { describe, expect, test } from "vitest";
import source from "../src/data/source-summary.json";
import { faqs, productCategories, products, siteConfig } from "../src/data/site";

const blockedServiceTerms = /\b(warranty|warranties|guarantee|guaranteed)\b|质保|保修|质量保证|退换货/i;
const blockedCommerceTerms = /\b(price|prices|pricing|cart|checkout|payment)\b|价格|报价|折扣|税费|运费/i;

describe("forbidden public content", () => {
  test("sanitized public data does not contain service promises or commerce display terms", () => {
    const publicData = JSON.stringify({ siteConfig, productCategories, products, faqs });

    expect(publicData).not.toMatch(blockedServiceTerms);
    expect(publicData).not.toMatch(blockedCommerceTerms);
  });

  test("source summary used by the site excludes blocked FAQ answers", () => {
    const sourceFaq = JSON.stringify(source.faq);

    expect(sourceFaq).not.toMatch(blockedServiceTerms);
    expect(sourceFaq).not.toMatch(blockedCommerceTerms);
  });
});
