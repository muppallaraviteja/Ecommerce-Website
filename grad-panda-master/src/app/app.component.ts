import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './auth/auth.service';
import { MessageService } from './message/message.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	isAuth = false;
	authSubscription: Subscription;
	constructor(
		private authService: AuthService,
		private messageService: MessageService,
		private snackBar: MatSnackBar,
	) {
			this.messageService.messages.subscribe(message => {
				this.openSnackBar(message);
			})
		}
	
	openSnackBar(message) {
    this.snackBar.open(message, 'dismiss', {
      duration: 1500,
    });
  }
	
	ngOnInit() {
		this.authService.initAuthListener();
		this.authService.authChange.subscribe(authStatus => {
			this.isAuth = authStatus;																			 
	  })
  }
	
  title = 'grad-panda';
}
