import { Subject } from 'rxjs/Subject';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './product.model';

import { MessageService } from '../message/message.service';

// make the service injectable so other services like messageService could be injected
@Injectable()
export class ProductService {
	// inject messageService and http client into product service
	constructor(
		private messageService: MessageService,
		private http: HttpClient
		) {}
	
	// initialize addedProducts, sum, and tax rate
	private addedProducts = [];
	private sum: number = 0;
	private taxRate = 0.0825;
	
	// return a product array observable from the backend API
	getProductsFromDB():Observable<Product[]> {
		return this.http.get<Product[]>('https://stormy-ravine-91370.herokuapp.com/items/all');
	}
	
	// return the current products in the cart
	getCartProducts() {
		return this.addedProducts.slice();
	}
	
	getTaxRate() {
		return this.taxRate;
	}
	
	getSum(){
		return this.sum;
	}
	
	// add selected product to cart 
	addProductToCart(product: Product) {
		// check if there's always a duplicate in the current cart
		if (!this.addedProducts.find(p => p.itemId === product.itemId)) {
			// if no, add the product
			this.addedProducts.push({...product, quantity: 1});
			// recalculate the updated sum
			this.sum = this.calculateSum();
		} else {
			// if yes, remind the user
			this.messageService.messages.next('You already bought the item!');
		}
	}
	
	removeProductFromCart(product: Product) {
		// remove the product from cart by id
		this.addedProducts = this.addedProducts.filter(p => p.itemId !== product.itemId);
		// recalculate the updated sum
		this.sum = this.calculateSum();
	}
	
	// reset the addedProducts and sum
	clearCart() {
		this.addedProducts = [];
		this.sum = 0;
	}
	
	changeQuantity(product: Product, quantity: number) {
		// go through the product list, find the product and update its quantity in cart
		this.addedProducts.forEach((p, i) => {
			if (p.itemId === product.itemId) {
				this.addedProducts[i] = { ...p, quantity};
			}
		});
		// recalculate the updated sum
		this.sum = this.calculateSum();
	}
	
	// use native js's reducer to go through the products and increment the sum
	calculateSum() {
		return this.addedProducts.reduce((sum, cur) => {
			return sum += cur.price * cur.quantity;
		}, 0);
	}
}