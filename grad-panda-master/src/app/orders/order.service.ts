import { Subject } from 'rxjs/Subject';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { Order } from './order.model';
import { Product } from '../products/product.model';

@Injectable()
export class OrderService {
	// inject services and http client 
	constructor(
		private authService: AuthService,
		private http: HttpClient
	) {}
	
	// initialize default orders to an empty array
	private orders: Order[] = [];
	// set API endpoints 
	getOrderUrl = 'https://stormy-ravine-91370.herokuapp.com/orders/all/';
	postOrderUrl = 'https://stormy-ravine-91370.herokuapp.com/orders/create/';
	deleteOrderUrl = 'https://stormy-ravine-91370.herokuapp.com/orders/delete/';
	// set up a subject for tracking order updates 
	ordersChanged = new Subject<Order[]>();
	
	fetchOrders() {
		const uid = this.authService.getUser().uid; // fetch the user id
		this.http.get<Order[]>(this.getOrderUrl + uid).subscribe(orders => this.ordersChanged.next(orders)); // return updated orders
	}
	
	createOrder(order) {
		// send a post request to server with order body
		this.http.post(this.postOrderUrl, order).subscribe(res => {
			this.fetchOrders(); //fetch the updated orders
		})
	}
	
	cancelOrder(orderId: string) {
		// send a delete request to server with order ID
		this.http.delete(this.deleteOrderUrl + orderId).subscribe(res => {
			this.fetchOrders();
		})
	}
}