import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { PageComponent  } from './error/page/page.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OrdersComponent } from './orders/orders.component'
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{path: '', component: LoginComponent },
	{path: 'about', component: AboutComponent },
	{path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
	{path: 'checkout', component: PaymentComponent, canActivate: [AuthGuard] },
	{path: 'contact', component: ContactComponent },
	{path: 'login', component: LoginComponent },
	{path: 'signup', component: SignupComponent },
	{path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
	{path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
	{path: 'products/:productId', component: ProductDetailComponent, canActivate: [AuthGuard] },
	{path: '404', component: PageComponent},
	{path: '**', redirectTo: '/404'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule {}