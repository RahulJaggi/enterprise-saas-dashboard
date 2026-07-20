export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Software' | 'API License' | 'Cloud Resource' | 'Add-on' | 'Consulting';
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  salesCount: number;
  createdAt: string;
}
