import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, test } from "vitest";

const root = path.resolve(__dirname, "..");
const summaryPath = path.join(root, "src", "data", "source-summary.json");

describe("source asset extraction", () => {
  test("maps product and factory images from their own Excel sheets", () => {
    execFileSync("node", ["tools/extract-source-assets.mjs"], {
      cwd: root,
      stdio: "pipe"
    });

    const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));

    expect(summary.assets.productImages).toHaveLength(40);
    expect(summary.assets.factoryImages).toHaveLength(8);
    expect(summary.products.every((product: { imageSourceSheet: string }) => product.imageSourceSheet === "产品信息")).toBe(true);
    expect(summary.assets.factoryImages.every((asset: { sourceSheet: string }) => asset.sourceSheet === "公司环境图片")).toBe(true);
    expect(summary.products.filter((product: { image: string }) => Boolean(product.image))).toHaveLength(40);
  });
});
