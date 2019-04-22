import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { SignupData } from './signup-data.model';
import { MessageService } from '../message/message.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
	// initialize authChange listener with a rxjs Subject
	authChange = new Subject<boolean>();
	private user; //initialize user object
	private isAuthenticated = false; //set default auth state to false
	
	// inject router and services into the auth service 
	constructor(
		private router: Router, 
		private angularAuth: AngularFireAuth,
		private messageService: MessageService,
		private uiService: UIService,
	) {}
	
	// listen for auth changes and update the status
	initAuthListener() {
		this.angularAuth.authState.subscribe(user => {
			if (user) {
				this.isAuthenticated = true; // change auth status
				this.authChange.next(true); // push update to listener
				this.router.navigate(['/products']); //navigate to product page
				this.user = user; // set default user with info from Firebasee
			} else {
				this.authChange.next(false);
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
				this.user = null; // set user back to null when auth state is logged out
			}
		})
	}
	
	registerUser(signupData: SignupData) {
		// start loading process; trigger the spinner 
		this.uiService.loadingStateChanged.next(true);
		// call Firebase's signup service with email & password 
		this.angularAuth.auth.createUserWithEmailAndPassword(
		signupData.email, signupData.password)
			.then(result => console.log(result))
			.catch(err => {
				// if there's any error, push error message to the user
				this.uiService.loadingStateChanged.next(false);
				this.messageService.messages.next(err.message)
			});
	}
	
	login(authData: AuthData) {
		this.uiService.loadingStateChanged.next(true);
		// call Firebase's login service with email & password
		this.angularAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
		.then(res => {
			this.uiService.loadingStateChanged.next(false);
			console.log(res);
		})
		.catch(err => {
			this.uiService.loadingStateChanged.next(false);
			this.messageService.messages.next(err.message)
		});

	}
	
	// call Firebase's logout service
	logout() {
		this.angularAuth.auth.signOut();
	}
	
	// return current logged in user object
	getUser() {
		return this.user;
	}
	
	// return the current auth status as a boolean
	isAuth() {
		return this.isAuthenticated;
	}
	
}