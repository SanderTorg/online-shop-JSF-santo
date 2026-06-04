import { Product, RootObject } from "../types/types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(
    `${process.env.API_BASE_URL}${process.env.ALL_PRODUCTS_ENDPOINT}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json: RootObject = await response.json();

  return json.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(
    `${process.env.API_BASE_URL}${process.env.ALL_PRODUCTS_ENDPOINT}/${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const json: { data: Product } = await response.json();
  return json.data;
}
