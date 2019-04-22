import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
	message: string = 'Default Message';

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
  }
	
	openSnackBar(message) {
    this.snackBar.open(message, 'dismiss', {
      duration: 2000,
    });
  }

}
