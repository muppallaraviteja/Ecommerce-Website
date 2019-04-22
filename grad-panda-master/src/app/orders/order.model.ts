import { Product } from '../products/product.model';

export interface Order {
	orderId: string;
	price: number;
	items: Product[];
}