import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { CategoryPipe } from "./category-pipe.module"; 
import { PriceRangePipe } from "./price-range-pipe.module";
import { SchoolPipe } from './school-pipe.module';
import { SizePipe } from './size-pipe.module';
import { YearPipe } from "./year-pipe.module";

@NgModule({
  declarations:[
		CategoryPipe,
		PriceRangePipe,
		SchoolPipe,
		SizePipe,
		YearPipe,
	],
  imports:[CommonModule],
  exports:[
		CategoryPipe,
		PriceRangePipe,
		SchoolPipe,
		SizePipe,
		YearPipe,
	],
})

export class MainPipe{}