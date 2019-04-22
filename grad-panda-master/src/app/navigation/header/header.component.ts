import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
	authSubscription: Subscription;
	
  constructor(private authService: AuthService) { }

  ngOnInit() {
		this.authService.authChange.subscribe(authStatus => {
			this.isAuth = authStatus;																			 
	  })
  }
																						 
	onLogout() {
		this.authService.logout();																					 
	}

	onToggleSidenav() {
		this.sidenavToggle.emit();
	}
																						 
	ngOnDestroy() {
		this.authSubscription.unsubscribe();																					 
	}
}
