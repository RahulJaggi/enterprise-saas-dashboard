export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Discontinued';

export interface Product {
  id: string;
  image: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
  status: ProductStatus;
  createdAt: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt'>;

export type UpdateProductInput = Partial<CreateProductInput> & { id: string };
