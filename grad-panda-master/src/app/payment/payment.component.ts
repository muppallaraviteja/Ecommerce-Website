import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Order } from '../orders/order.model';
import { OrderService } from '../orders/order.service';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
	unpaidProducts: Product[];
	sum: number;
	tax: number;
	total: number;
  
  constructor(
	  private authService: AuthService,
		private productService: ProductService,
		private orderService: OrderService,
		private router: Router,
	) { }

  ngOnInit() {
		this.unpaidProducts = this.productService.getCartProducts();
		this.sum = this.productService.getSum();
		this.tax = this.sum * this.productService.getTaxRate();
		this.total = this.sum + this.tax;
		console.log("unpaid products", this.unpaidProducts);
  }
	
	pay(products: Product[], sum: number) {
		const itemDetails = this.unpaidProducts.map(product => {
			return {
				itemId: product.itemId,
				no_of_items: product.quantity
			};
		});
		
		const order = {
			date: new Date(),
			price: sum,
			customerId: this.authService.getUser().uid,
			orderDetails: itemDetails
		}
		console.log(order);
		this.productService.clearCart();
		this.orderService.createOrder(order);
		this.router.navigate(['/orders']);
	}

}
