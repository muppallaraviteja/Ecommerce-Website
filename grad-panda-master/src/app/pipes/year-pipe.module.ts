import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product.model';

@Pipe({
	name: 'matchesYear'
})
export class YearPipe implements PipeTransform {
	transform(items: Array<Product>, selectedYear: number): Array<Product> {
		if (!selectedYear) return items;
		return items.filter(item => item.year === selectedYear);
	}
}