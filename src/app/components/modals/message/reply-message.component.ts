import { Component, Input } from '@angular/core';

@Component({
  selector: 'hms-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.css'],
})
export class ReplyMessageComponent {
  @Input({ required: true })
  userEmail!: string;
}
