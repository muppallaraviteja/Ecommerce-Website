import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { MyErrorStateMatcher } from './ErrorStateMatcher';

export interface Profile {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	loading = false;
	private loadingSubscription: Subscription;
	matcher = new MyErrorStateMatcher();
	form: FormGroup;
	
	profiles: Profile[] = [
		{value: 'Buyer', viewValue: 'Buyer'},
		{value: 'Seller', viewValue: 'Seller'},
		{value: 'Renter', viewValue: 'Renter'},
		{value: 'Lender', viewValue: 'Lender'},
	];
	
  constructor(
	  private fb: FormBuilder,
		private authService: AuthService,
		private uiService: UIService,
	) { 
			this.form = fb.group({
				name: ['', Validators.required],
				email: [''],
				phone: ['', Validators.required],
				profile: ['', Validators.required],
				password: ['', Validators.required],
				confirmedPassword: ['', Validators.required]
			}, {
				validator: this.checkPasswords
			})
		}
	
	checkPasswords(group: FormGroup) { 
		let pass = group.controls.password.value;
		let confirmPass = group.controls.confirmedPassword.value;
		return (pass === confirmPass || confirmPass === "" || confirmPass.length < 6) ? null : { notSame: true }     
	}

  ngOnInit() {
		this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.loading = state);
  }
	
	ngOnDestroy() {
		this.loadingSubscription.unsubscribe();
	}
	
	onSubmit(form) {
		console.log(form);
		this.authService.registerUser({
			email: form.value.email,
			password: form.value.password,
			phone: form.value.phone,
			profile: form.value.profile,
		});
	}
}
