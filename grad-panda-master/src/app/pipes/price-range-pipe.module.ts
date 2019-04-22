import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product.model';

@Pipe({
	name: 'matchesPriceRange'
})
export class PriceRangePipe implements PipeTransform {
	transform(items: Array<Product>, maxPrice: number): Array<Product> {
		if (maxPrice === 0) return items;
		return items.filter(item => parseInt(item.price, 10) <= maxPrice);
	}
}