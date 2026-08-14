import source from "./source-summary.json";

export type Product = {
  id: string;
  slug: string;
  category: string;
  name: string;
  spec: string;
  description: string;
  detail: string;
  materials: string[];
  image: string;
};

export type Faq = {
  category: string;
  question: string;
  answer: string;
};

const forbiddenPattern = /\b(warranty|warranties|guarantee|guaranteed)\b|质保|保修|质量保证|退换货/i;
const commercialDisplayPattern = /\b(price|prices|pricing|cart|checkout|payment)\b|价格|报价|折扣|税费|运费/i;

function sanitizeText(value: string) {
  return value
    .replace(forbiddenPattern, "")
    .replace(/\s+/g, " ")
    .trim();
}

const colorMap: Record<string, string> = {
  藏红: "Burgundy",
  羊绒粉: "Cashmere pink",
  野营绿: "Camp green",
  云灰: "Cloud grey",
  复古咖啡: "Vintage coffee",
  鼠尾绿: "Sage green",
  香槟白: "Champagne white",
  木槿蓝: "Hibiscus blue",
  蓝海流光: "Blue melange",
  盐水蓝: "Saltwater blue",
  可可蛋奶: "Cocoa cream",
  木炭灰: "Charcoal grey",
  黑色: "Black",
  浅灰: "Light grey",
  粉色: "Pink",
  藏青: "Navy",
  米色: "Beige",
  黄色: "Yellow",
  高级灰: "Premium grey",
  落樱粉: "Cherry blossom pink"
};

function translateSpec(spec: string) {
  const normalized = sanitizeText(spec).replace(/\s*\/\s*/g, "/").replace("半裙", "");
  if (!normalized) return "Custom color / size by inquiry";

  const parts = normalized.split("/").filter(Boolean);
  const sizes = parts.filter((part) => /^[A-Z](?:-[A-Z]+)?$|^[A-Z]+-[A-Z]+$/.test(part));
  const colors = parts.filter((part) => !sizes.includes(part)).map((part) => colorMap[part] ?? part);

  if (colors.length && sizes.length) return `${colors.join(" / ")} / ${sizes.join(" / ")}`;
  if (colors.length) return `${colors.join(" / ")} / Custom size`;
  if (sizes.length) return `Custom color / ${sizes.join(" / ")}`;
  return normalized.replace(/[^\x20-\x7E]/g, "").trim() || "Custom color / size by inquiry";
}

function buildEnglishDescription(product: { category: string; name: string; materials: string[] }) {
  const materials = product.materials.length ? product.materials.join(", ") : "selected yarns and fabrics";
  if (product.category === "Goose Down Outerwear") {
    return `${product.name} is an export-ready outerwear style made with ${materials}. Color, size range, shell fabric, lining, label, packing, and order inspection details can be confirmed through the inquiry process.`;
  }
  if (product.category === "Pure Wool Sweaters") {
    return `${product.name} is prepared for private-label wool sweater sourcing programs. Buyers can discuss yarn selection, color, size grading, decorative details, label, packing, and sampling requirements during inquiry.`;
  }
  return `${product.name} is a premium knitwear style prepared for B2B seasonal collections and private-label apparel programs. Buyers can confirm ${materials}, color, size grading, workmanship, label, packing, and sampling details during inquiry.`;
}

function normalizeModelId(id: string) {
  return id.replace("半裙", "-SKIRT").replace(/[^\x20-\x7E]/g, "").trim();
}

function translateFaqAnswer(answer: string) {
  const normalized = sanitizeText(answer);
  if (normalized.includes("XS/S/M/L")) return "Common size ranges include XS to XXL, with custom grading available for confirmed programs.";
  if (normalized.includes("定制化")) return "Yes. Size, material, color, texture, and workmanship details can be customized for OEM and ODM orders.";
  if (normalized.includes("样品")) return "Samples can be arranged for material, fit, workmanship, and color confirmation before bulk production.";
  if (normalized.includes("技术参数") || normalized.includes("检测报告")) return "Technical sheets and third-party inspection documents can be prepared when required by the order.";
  if (normalized.includes("服装零售")) return "The collections support fashion retail, private-label apparel, event uniforms, sportswear, and seasonal outerwear programs.";
  if (normalized.includes("OEM") || normalized.includes("ODM")) return "Both OEM private-label production and ODM design-to-production cooperation are supported.";
  if (normalized.includes("500")) return "The regular MOQ starts from 500 pieces, adjusted by style, material, and process complexity.";
  if (normalized.includes("数量越大")) return "Bulk programs can be quoted by volume tier after the style, fabric, and workmanship are confirmed.";
  if (normalized.includes("包装")) return "Packaging, shipping, and tax-related requirements can be discussed according to the destination and trade terms.";
  if (normalized.includes("长期合作")) return "Long-term cooperation programs can receive dedicated planning based on forecast volume and repeat orders.";
  if (normalized.includes("原材料")) return "Fabric, yarn, and exchange-rate changes may affect final quotation; confirmed orders are communicated clearly before production.";
  if (normalized.includes("7-15")) return "Sample lead time is usually 7 to 15 working days, depending on style complexity and material readiness.";
  if (normalized.includes("先打样")) return "Pre-production sample approval is supported before bulk production starts.";
  if (normalized.includes("大货")) return "Bulk production follows the approved sample, confirmed fabric, color standard, and workmanship requirements.";
  if (normalized.includes("30-45")) return "Standard production lead time is usually 30 to 45 working days after details and materials are confirmed.";
  if (normalized.includes("交期稳定")) return "Production scheduling is managed with workshop planning and progress tracking for stable delivery windows.";
  if (normalized.includes("旺季")) return "Peak-season schedules are planned in advance with clear communication on material and production timing.";
  if (normalized.includes("加急")) return "Urgent production can be evaluated case by case when capacity and material availability allow.";
  if (normalized.includes("进度")) return "Progress updates can cover material sourcing, cutting, sewing, finishing, inspection, and packing milestones.";
  if (normalized.includes("质量控制")) return "A staged quality control process covers incoming materials, in-line production checks, and final inspection before shipment.";
  if (normalized.includes("第三方")) return "Third-party inspection is supported when requested by the buyer or destination market.";
  if (normalized.includes("质检报告")) return "Inspection records and shipment documents can be prepared according to the confirmed order requirements.";
  return "Our team can confirm the details based on your style, quantity, material, and delivery requirements.";
}

export const siteConfig = {
  brandName: "SUXING International",
  companyName: "Zhejiang Suxing Knitting Co., Ltd.",
  companyNameZh: source.company.nameZh,
  defaultLocale: "en",
  supportedLocales: ["en"],
  futureLocales: ["zh", "es", "fr", "de"],
  contact: {
    phone: source.company.phone,
    email: "info@suxingapparel.com",
    address: "No. 409 Hongxing Road, Qiaonan Block, Xiaoshan Economic and Technological Development Zone, Zhejiang, China"
  },
  facility: source.company.facility,
  logo: source.assets.logo,
  heroImage: source.products[0]?.image ?? "/brand/logo.png",
  factoryImages: source.assets.factoryImages.map((asset) => asset.path)
} as const;

export const products: Product[] = source.products.map((product) => ({
  id: normalizeModelId(product.id),
  slug: product.slug,
  category: product.category,
  name: product.name,
  spec: translateSpec(product.spec),
  description: buildEnglishDescription(product),
  detail: "",
  materials: product.materials,
  image: product.image
}));

export const productCategories = Array.from(new Set(products.map((product) => product.category))).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
  count: products.filter((product) => product.category === name).length
}));

export const faqs: Faq[] = source.faq
  .filter((item) => !commercialDisplayPattern.test(`${item.category} ${item.question} ${item.answer}`))
  .map((item) => ({
    category: item.category || "General",
    question: sanitizeText(item.question),
    answer: translateFaqAnswer(item.answer)
  }))
  .filter((item) => !forbiddenPattern.test(`${item.question} ${item.answer}`));

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function buildInquirySubject(product?: Product) {
  if (!product) return "General B2B apparel manufacturing inquiry";
  return `Inquiry for ${product.name} (${product.id})`;
}
