export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  categoryId: string;
  category: { title: string; slug: string };
  texture: string;
  hairColor: string | null;
  lengths: number[];
  origin: string;
  weight: number | null;
  isDoubleDrawn: boolean;
  density: string | null;
  laceType: string | null;
  laceSize: string | null;
  tags: string[];
  stock: number;
  featured: boolean;
  images: ProductImage[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  _count?: { products: number };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  total: number;
  status: string;
  email: string;
  shippingAddress: ShippingAddress | null;
  stripePaymentId: string | null;
  items: OrderItem[];
  user?: { name: string | null; email: string; image: string | null };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  productName: string;
  productImage: string | null;
  product?: { slug: string; images: ProductImage[] };
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { name: string | null; image: string | null };
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: "CUSTOMER" | "ADMIN";
  createdAt: string;
  addresses?: Address[];
  _count?: { orders: number; reviews: number };
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  postcode: string;
  country: string;
  isDefault: boolean;
}
