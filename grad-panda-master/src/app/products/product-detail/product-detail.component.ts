import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';

export interface Size {
	value: string;
	viewValue: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	@Input() product: Product;
	loading = true;
	sizes: Size[] = [
		{ value: 'S', viewValue: 'Small'},
		{ value: 'M', viewValue: 'Medium'},
		{ value: 'L', viewValue: 'Large'},
		{ value: 'XL', viewValue: 'Extra Large'},
	];
  constructor(
			private productService: ProductService, 
			private location: Location,
		 	private route: ActivatedRoute,
			private router: Router,
		) { }

  ngOnInit() {
		this.getProduct();
  }
	
	addItemToCart(product: Product) {
		console.log(product);
		this.productService.addProductToCart(product);
		this.router.navigate(['/cart']);
	}
	
	getProduct() {
		const productId = this.route.snapshot.paramMap.get('productId');
		this.productService.getProductsFromDB().subscribe(products => {
			this.product = products.find(p => p.itemId == productId);
			this.loading = false;
		})
	}

}
