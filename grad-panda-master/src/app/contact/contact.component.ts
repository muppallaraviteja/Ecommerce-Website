import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
	
	sendContactMsg(message:string) {
		this.messageService.messages.next('Thanks! Midori will get back to you ASAP!');
	}

}
