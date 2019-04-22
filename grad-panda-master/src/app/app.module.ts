import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProductsComponent } from './products/products.component';

import { AuthService } from './auth/auth.service';
import { MessageService } from './message/message.service';
import { OrderService } from './orders/order.service';
import { ProductService } from './products/product.service';
import { UIService } from './shared/ui.service';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

import { MainPipe } from './pipes/main-pipe.module';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';

import * as $ from 'jquery';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { PageComponent } from './error/page/page.component';
import { MessageComponent } from './message/message.component'

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    SidenavComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    ProductDetailComponent,
    CartComponent,
    PaymentComponent,
    OrdersComponent,
    NavbarComponent,
    ContactComponent,
    PageComponent,
    MessageComponent
  ],
  imports: [
		AppRoutingModule,
    BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		FlexLayoutModule,
		MaterialModule,
		ReactiveFormsModule,
		MainPipe,
		OwlModule,
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, MessageService, OrderService, ProductService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
