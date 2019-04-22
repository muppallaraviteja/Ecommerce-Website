import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	// initialize cart products with empty array
	cartProducts: Product[] = [];
	// specify quantities and defaultQty for dropdown values
	quantities: number[] = [1, 2, 3, 4, 5];
	defaultQty: number = this.quantities[0];

	// initialize sum and taxRate 
	sum: number = 0;
	taxRate: number;

	// inject productService and router in the cart component 
  constructor(
			private productService: ProductService, private router: Router,
		) { }

  ngOnInit() {
		// retrieve taxRate, products in cart and sum from injected product service 
		this.taxRate = this.productService.getTaxRate();
		this.cartProducts = this.productService.getCartProducts();
		this.sum = this.productService.getSum();
	}
	
	// change the quantity of specific items in the cart
	changeQuantity(product: Product, quantity: number) {
		this.productService.changeQuantity(product, quantity);
		this.sum = this.productService.getSum();
	}
	
	// navigate to payment page
	checkOut() {
		this.router.navigate(['/checkout']);
	}
	
	// call removeProduct function from product service and recalculate the updated sum 
	removeProductFromCart(product: Product) {
		this.productService.removeProductFromCart(product);
		this.cartProducts = this.productService.getCartProducts();
		this.sum = this.productService.getSum();
	}
	
	// navigate back to product page
	backToProducts() {
		this.router.navigate(['/products']);
	}
}
