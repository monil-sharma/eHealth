export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
  stock: number;
  categoryName?: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    categoryId: number,
    image: string,
    stock: number
  ) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.description = description;
    this.price = price;
    this.image = image;
    this.stock = stock;
  }
}
