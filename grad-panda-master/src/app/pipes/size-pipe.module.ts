import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product.model';

@Pipe({
	name: 'matchesSize'
})
export class SizePipe implements PipeTransform {
	transform(items: Array<Product>, selectedSize: string): Array<Product> {
		if (!selectedSize) return items;
		return items.filter(item => item.size === selectedSize);
	}
}