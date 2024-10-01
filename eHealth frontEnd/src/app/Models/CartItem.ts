export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  customerId: number;
  customerName?: string;
  quantity: number;
  stock: number; 
}