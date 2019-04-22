import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
	@Output() closeSidenav = new EventEmitter<void>();
	isAuth = false;
	authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
		this.authService.authChange.subscribe(authStatus => {
			this.isAuth = authStatus;																				
		});
  }
																						
	ngOnDestroy() {
		this.authSubscription.unsubscribe();																	
	}
																						
	onClose() { this.closeSidenav.emit(); }
	
	onLogout() {
		this.authService.logout();
		this.onClose();
	}
}
