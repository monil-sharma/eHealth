export interface Order {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  date: Date;
  status: string;
  amount: number;
  productName?: string;
  productPrice?: number;
  categoryName?: string;
}
