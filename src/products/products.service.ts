import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  isAvailable: boolean;
  createdAt: Date;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 10000000, category: 'Elektronik', stock: 10, isAvailable: true, createdAt: new Date() },
    { id: 2, name: 'Mouse', price: 150000, category: 'Aksesoris', stock: 50, isAvailable: true, createdAt: new Date() },
    { id: 3, name: 'Keyboard', price: 300000, category: 'Aksesoris', stock: 30, isAvailable: true, createdAt: new Date() },
    { id: 4, name: 'Monitor', price: 2500000, category: 'Elektronik', stock: 15, isAvailable: true, createdAt: new Date() },
    { id: 5, name: 'Headset', price: 500000, category: 'Audio', stock: 0, isAvailable: false, createdAt: new Date() },
    { id: 6, name: 'Webcam', price: 450000, category: 'Elektronik', stock: 20, isAvailable: true, createdAt: new Date() },
    { id: 7, name: 'Speaker', price: 800000, category: 'Audio', stock: 12, isAvailable: true, createdAt: new Date() },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  create(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      id: this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1,
      ...data,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, data: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  findByCategory(category: string): Product[] {
    return this.products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  findAvailable(): Product[] {
    return this.products.filter((p) => p.stock > 0 && p.isAvailable);
  }
}
