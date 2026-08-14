import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import HomePage from "../app/page";
import ProductsPage from "../app/products/page";
import ProductDetailPage from "../app/products/[slug]/page";
import NewsPage from "../app/news/page";
import ContactPage from "../app/contact/page";
import { products } from "../src/data/site";

describe("independent pages", () => {
  test("home renders premium B2B positioning", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: /premium knitwear/i })).toBeTruthy();
    expect(screen.getByText(/60 production lines/i)).toBeTruthy();
  });

  test("products page renders catalog and categories", () => {
    render(<ProductsPage />);

    expect(screen.getByRole("heading", { name: /product collections/i })).toBeTruthy();
    expect(screen.getAllByText(/send inquiry/i).length).toBeGreaterThan(3);
  });

  test("product detail page carries inquiry CTA", async () => {
    render(await ProductDetailPage({ params: Promise.resolve({ slug: products[0].slug }) }));

    expect(screen.getByRole("heading", { name: products[0].name })).toBeTruthy();
    expect(screen.getByDisplayValue(`Inquiry for ${products[0].name} (${products[0].id})`)).toBeTruthy();
  });

  test("news page shows empty state without invented news", () => {
    render(<NewsPage />);

    expect(screen.getByRole("heading", { name: /news/i })).toBeTruthy();
    expect(screen.getByText(/No published updates yet/i)).toBeTruthy();
  });

  test("contact page renders the real inquiry form target", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { name: /contact suxing/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /submit inquiry/i })).toBeTruthy();
  });
});
