import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product.model';

@Pipe({
    name: 'matchesCategory'
})
export class CategoryPipe implements PipeTransform {
    transform(items: Array<Product>, category: string): Array<Product> {
				if (!category) return items;
        return items.filter(item => item.category === category);
    }
}


