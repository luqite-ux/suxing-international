import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { InquiryForm } from "../components/inquiry-form";
import { products } from "../src/data/site";

describe("site shell components", () => {
  test("navigation includes Home and logo returns home", () => {
    render(<SiteHeader />);

    expect(screen.getByText("Home").closest("a")?.getAttribute("href")).toBe("/");
    expect(screen.getByLabelText("SUXING International home").getAttribute("href")).toBe("/");
  });

  test("shared inquiry CTAs point to contact or inquiry form targets", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: /send inquiry/i }).getAttribute("href")).toBe("/contact");
    expect(screen.getByRole("link", { name: /products/i }).getAttribute("href")).toBe("/products");
  });

  test("inquiry form carries selected product context", () => {
    render(<InquiryForm product={products[0]} />);

    expect(screen.getByDisplayValue(`Inquiry for ${products[0].name} (${products[0].id})`)).toBeTruthy();
    expect(screen.getByRole("button", { name: /submit inquiry/i })).toBeTruthy();
  });
});
