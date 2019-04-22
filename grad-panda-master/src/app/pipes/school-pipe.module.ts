import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product.model';

@Pipe({
	name: 'matchesSchool'
})
export class SchoolPipe implements PipeTransform {
	transform(items: Array<Product>, selectedSchool: string): Array<Product> {
		if (!selectedSchool) return items;
		return items.filter(item => item.school === selectedSchool);
	}
}