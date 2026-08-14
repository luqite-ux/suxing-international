import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const workbookPath = "D:/Cursor/暂存/1421-浙江素型针纺对接群/企业资料&产品&FAQ问题收集表_1785460927.xlsx";
const logoPath = "D:/Cursor/暂存/1421-浙江素型针纺对接群/LOGO.png";
const pythonCandidates = [
  "C:/Users/Grandlin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe",
  "python"
];

const script = String.raw`
import json, os, re, shutil, sys
from pathlib import Path
import openpyxl

root = Path(sys.argv[1])
workbook_path = Path(sys.argv[2])
logo_path = Path(sys.argv[3])

product_dir = root / "public" / "assets" / "products"
factory_dir = root / "public" / "assets" / "factory"
brand_dir = root / "public" / "brand"
data_dir = root / "src" / "data"
for folder in (product_dir, factory_dir, brand_dir, data_dir):
    folder.mkdir(parents=True, exist_ok=True)

def clean(value):
    return re.sub(r"\s+", " ", str(value or "").replace("\n", " ")).strip()

def slugify(value):
    value = clean(value).lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "item"

def image_ext(data):
    if data.startswith(b"\x89PNG"):
        return ".png"
    if data.startswith(b"\xff\xd8"):
        return ".jpg"
    if data.startswith(b"GIF"):
        return ".gif"
    return ".png"

name_map = {
    "短款拉链开衫": "Cropped Zip Cardigan",
    "ROW版圆领套头衫": "Relaxed Crewneck Pullover",
    "高领插肩袖套头衫": "Turtleneck Raglan Pullover",
    "圆领绞花开衫": "Cable-Knit Crewneck Cardigan",
    "A字半裙": "A-Line Knit Skirt",
    "ROW版一字领套头衫": "Boat-Neck Relaxed Pullover",
    "一字领花纱套衫": "Boat-Neck Mélange Pullover",
    "圆领花纱套头衫": "Mélange Crewneck Pullover",
    "加厚圆领套头衫": "Brushed Cashmere Crewneck",
    "V领豆豆纱套头衫": "V-Neck Textured Yarn Pullover",
    "一手长提花开衫": "Fair Isle Jacquard Cardigan",
    "圆领卷边套头衫": "Rolled-Edge Crewneck Pullover",
    "大版费尔岛提花套头衫": "Oversized Fair Isle Pullover",
    "剪刀领套头衫": "Notched-Neck Cable Pullover",
    "高领大肚纱套头衫": "Slub Yarn Turtleneck Pullover",
    "剪刀领提花马甲": "Jacquard Knit Vest",
    "短款插肩袖圆领套头衫": "Cropped Raglan Crewneck Pullover",
    "插肩袖圆领套头衫": "Raglan Crewneck Pullover",
    "披肩套头衫": "Cape-Style Knit Pullover",
    "圆领费尔岛提花套头衫": "Fair Isle Crewneck Pullover",
    "U型领马甲": "Deep U-Neck Knit Vest",
    "复古绞花波浪边套头衫": "Vintage Cable Wave-Edge Pullover",
    "高领提花开衫": "High-Neck Jacquard Cardigan",
    "高领短款套头衫": "Cropped High-Neck Pullover",
    "剪刀领花纱套头衫": "Notched-Neck Mélange Pullover",
    "V领绞花套头衫": "V-Neck Cable Pullover",
    "条纹套头衫": "Striped Brushed Cashmere Pullover",
    "段染花纱V领开衫": "Space-Dyed V-Neck Cardigan",
    "中长款鹅绒服": "Mid-Length Goose Down Jacket",
    "立领短款鹅绒服": "Short Stand-Collar Goose Down Jacket",
    "连帽短款鹅绒服": "Short Hooded Goose Down Jacket",
    "一手长鹅绒服": "Full-Length Goose Down Coat",
    "长款鹅绒服": "Long Goose Down Coat",
    "排骨款轻薄鹅绒服": "Lightweight Quilted Goose Down Jacket",
    "钉珠圆领毛衫": "Beaded Crewneck Wool Sweater",
}

category_map = {
    "羊毛衫": "Premium Knitwear",
    "鹅绒服": "Goose Down Outerwear",
    "全羊毛毛衫": "Pure Wool Sweaters",
}

for existing in list(product_dir.glob("*")) + list(factory_dir.glob("*")):
    existing.unlink()
shutil.copyfile(logo_path, brand_dir / "logo.png")

wb = openpyxl.load_workbook(workbook_path, data_only=True)
company_ws = wb["企业资料"]
product_ws = wb["产品信息"]
faq_ws = wb["FAQ问题"]
factory_ws = wb["公司环境图片"]

company = {}
for row in company_ws.iter_rows(min_row=3, max_col=3, values_only=True):
    key = clean(row[0])
    value = clean(row[2])
    if key and value:
        company[key.replace("*", "").strip()] = value

image_rows = {}
product_images = []
for index, image in enumerate(product_ws._images, start=1):
    row = image.anchor._from.row + 1
    data = image._data()
    ext = image_ext(data)
    filename = f"product-{index:02d}-row-{row}{ext}"
    (product_dir / filename).write_bytes(data)
    record = {
        "index": index,
        "row": row,
        "sourceSheet": "产品信息",
        "path": f"/assets/products/{filename}",
    }
    image_rows[row] = record
    product_images.append(record)

products = []
last = {"code": "", "category": "", "name": ""}
seen_slugs = set()
for row in range(4, product_ws.max_row + 1):
    code = clean(product_ws.cell(row, 1).value) or last["code"]
    category_cn = clean(product_ws.cell(row, 2).value) or last["category"]
    name_cn = clean(product_ws.cell(row, 4).value) or last["name"]
    description = clean(product_ws.cell(row, 6).value)
    spec = clean(product_ws.cell(row, 8).value)
    detail = clean(product_ws.cell(row, 12).value)
    if clean(product_ws.cell(row, 1).value):
        last["code"] = code
    if clean(product_ws.cell(row, 2).value):
        last["category"] = category_cn
    if clean(product_ws.cell(row, 4).value):
        last["name"] = name_cn
    if row not in image_rows:
        continue
    english_name = name_map.get(name_cn, name_cn or code)
    base_slug = slugify(f"{code}-{english_name}")
    slug = base_slug
    suffix = 2
    while slug in seen_slugs:
        slug = f"{base_slug}-{suffix}"
        suffix += 1
    seen_slugs.add(slug)
    material_notes = []
    text = f"{description} {detail}"
    if "羊绒" in text or "cashmere" in text.lower():
        material_notes.append("cashmere blend")
    if "亚麻" in text:
        material_notes.append("linen blend")
    if "鹅绒" in text or "羽绒" in text:
        material_notes.append("95% white goose down")
    if "100%" in text and "羊绒" in text:
        material_notes.append("100% cashmere yarn")
    products.append({
        "id": code or f"SX-{row}",
        "slug": slug,
        "category": category_map.get(category_cn, category_cn or "Apparel"),
        "categoryCn": category_cn,
        "name": english_name,
        "nameCn": name_cn,
        "spec": spec,
        "description": description,
        "detail": detail,
        "materials": sorted(set(material_notes)),
        "image": image_rows[row]["path"],
        "imageRow": row,
        "imageSourceSheet": "产品信息",
    })

factory_images = []
for index, image in enumerate(factory_ws._images, start=1):
    data = image._data()
    ext = image_ext(data)
    row = image.anchor._from.row + 1
    col = image.anchor._from.col + 1
    filename = f"factory-{index:02d}-row-{row}-col-{col}{ext}"
    (factory_dir / filename).write_bytes(data)
    factory_images.append({
        "index": index,
        "row": row,
        "col": col,
        "sourceSheet": "公司环境图片",
        "path": f"/assets/factory/{filename}",
    })

faq = []
for row in faq_ws.iter_rows(min_row=4, values_only=True):
    question = clean(row[2])
    answer_cn = clean(row[3])
    if not question or not answer_cn:
        continue
    blocked = re.search(r"质保|保修|质量保证|退换货|warranty|guarantee|价格|报价|折扣|税费|运费|price|prices|pricing|cart|checkout|payment", question + " " + answer_cn + " " + clean(row[0]), re.I)
    if blocked:
        continue
    faq.append({
        "category": clean(row[0]),
        "question": question,
        "answer": answer_cn,
    })

summary = {
    "company": {
        "displayName": "Zhejiang Suxing Knitting Co., Ltd.",
        "brandName": "SUXING International",
        "nameZh": company.get("公司名称", "浙江素型针纺有限公司"),
        "address": company.get("公司地址", ""),
        "phone": company.get("官方联系手机号码", ""),
        "email": company.get("邮箱", ""),
        "facility": {
            "area": "100 mu",
            "workshops": 7,
            "productionLines": 60,
            "monthlyCapacity": "400,000 pieces",
            "dailyCapacity": "16,000 pieces",
            "lineMix": "3 automated lines, 6 custom lines, and 51 flow lines",
        },
    },
    "products": products,
    "faq": faq,
    "assets": {
        "logo": "/brand/logo.png",
        "productImages": product_images,
        "factoryImages": factory_images,
    },
}

(data_dir / "source-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"products": len(products), "productImages": len(product_images), "factoryImages": len(factory_images)}, ensure_ascii=False))
`;

async function main() {
  await fs.mkdir(path.join(root, "src", "data"), { recursive: true });
  let lastError;
  for (const python of pythonCandidates) {
    const result = spawnSync(python, ["-c", script, root, workbookPath, logoPath], {
      cwd: root,
      encoding: "utf8"
    });
    if (result.status === 0) {
      process.stdout.write(result.stdout);
      return;
    }
    lastError = result.stderr || result.stdout;
  }
  throw new Error(lastError || "Unable to run Python extractor");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
