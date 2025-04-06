export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    hotDeal: boolean;
  };
  
  // Explicitly allow 'product' to be either a full object or just an ID
  export type CartItem = {
    _id: string;
    product: Product | string;
    quantity: number;
  };
  