import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { MessageService } from '../../message/message.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
	loading = false;
	private loadingSubscription: Subscription;
	
  constructor(
		private authService: AuthService,
	  private messageService: MessageService,
		private uiService: UIService,
	) { }

  ngOnInit() {
		this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.loading = state);
		this.loginForm = new FormGroup({
			email: new FormControl('', {validators: [Validators.required, Validators.email]}),
			password: new FormControl('', {validators: [Validators.required]})
		});
  }
	
	ngOnDestroy() {
		this.loadingSubscription.unsubscribe();
	}

	onSubmit(form: NgForm) {
		this.authService.login({
			email: form.value.email,
			password: form.value.password
		})
	}
}
