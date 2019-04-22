import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Order } from './order.model';
import { AuthService } from '../auth/auth.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {
	// initialize a subscription instance listening for order changes 
	private orderSubscription: Subscription;
	// set order attributes to be displayed in table
	displayedColumns = ['orderId', 'price', 'date', 'actions']; 
	// set default loading state
	loading = true;
	// initialize new data source instance
	dataSource = new MatTableDataSource<Order>();
	// inject services and router
	
	@ViewChild(MatSort) sort: MatSort;
  constructor(
		private authService: AuthService,
		private orderService: OrderService,
		private router: Router,
	) { }

  ngOnInit() {
		// hook up the subscription to data source change from order service
		this.orderSubscription = this.orderService.ordersChanged.subscribe(orders => {
			this.dataSource.data = orders; //update the data source
			this.loading = false; // set loading to false
		})
		this.orderService.fetchOrders() // refetch the orders
  }
	
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		console.log(this.sort);
	}
	
	ngOnDestroy() {
		this.orderSubscription.unsubscribe(); // unsubscribe when compnent dies
	}
	
	cancelOrder(orderId) {
		this.orderService.cancelOrder(orderId); // connect to cancelOrder action on service
	}
}
