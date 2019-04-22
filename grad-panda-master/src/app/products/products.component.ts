import { Component, OnInit, OnDestroy, Pipe, PipeTransform, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material';

import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';
import { UIService } from '../shared/ui.service';
import { Product } from './product.model';

export interface Category {
	value: string;
	viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	loading = false;
	private productLoadingSubscription: Subscription;
	products: Product[] = [];
	currentUser;
	categories: Category[] = [
		{ value: 'gown', viewValue: 'Gown'},
		{ value: 'hood', viewValue: 'Hood'},
		{ value: 'tassel', viewValue: 'Tassel'},
		{ value: 'stole', viewValue: 'Stole'},
	];	
	years: number[] = [2019, 2020, 2021];
	schools: string[] = ['Texas', 'TAMU', 'Baylor', 'UTD', 'TCU', 'Rice'];
	sizes: string[] = ['S', 'M', 'L', 'XL'];
	
	selectedCategory: string;
	maxPrice = 100;
	selectedYear: number;
	selectedSchool: string;
	selectedSize: string;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
			private authService: AuthService,
			private productService: ProductService,
			private uiService: UIService,
		) { }

  ngOnInit() {
		this.productLoadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.loading = state);
		this.uiService.loadingStateChanged.next(true);
		this.currentUser = this.authService.getUser();
		this.productService.getProductsFromDB().subscribe(products => {
			this.products = products;
			this.uiService.loadingStateChanged.next(false);
		})
  }
	
	ngOnDestroy() {
		this.productLoadingSubscription.unsubscribe();
	}
	
	changeCategory(category: string) {
		this.selectedCategory = category;
	}
	
	onPriceChange(price: number) {
		this.maxPrice = price;
	}
	
	onYearChange(year: number) {
		this.selectedYear = year;
	}
	
	onSchoolChange(school: string) {
		this.selectedSchool = school;
	}
	
	onSizeChange(size: string) {
		this.selectedSize = size;
	}
	
	clearFilter(): void {
		this.selectedCategory = null;
		this.selectedYear = null;
		this.selectedSize = null;
		this.selectedSchool = null;
		this.selectedCategory = null;
		this.maxPrice = 100;
	}

}
