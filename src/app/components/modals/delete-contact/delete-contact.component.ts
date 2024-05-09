import { Component, Input } from '@angular/core';
import { ContactService } from '../../../services/contact/contact.service';
import { HttpStatusCode } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hms-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css'],
})
export class DeleteContactComponent {
  @Input({ required: true })
  userEmail!: string;
  successMessage!: string;
  errorMessage!: string;
  infoMessage!: string;
  IsFetching: boolean = false;
  IsDeleting: boolean = false;
  IsCopied!: boolean;
  delForm!: FormGroup;

  constructor(private contactService: ContactService) {
    this.delForm = new FormGroup({
      userId: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.infoMessage = '';
      this.IsCopied = false;
    }, timeOut);
  }

  deleteContact(): void {
    if (!this.delForm.valid) {
      this.errorMessage = 'Message Id is required.';
      this.setTimeOut();
      return;
    }
    this.IsDeleting = true;
    const msgId: string = this.delForm.value.userId;
    this.contactService.deleteContact(msgId).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok || res.data?.deleted) {
          this.successMessage = res.message;
          this.IsDeleting = false;
          this.setTimeOut(3000);
          this.delForm.reset();
        }
        this.IsDeleting = false;
        this.setTimeOut(3000);
        this.delForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error.message.message;
        this.IsDeleting = false;
        this.setTimeOut(3000);
        this.delForm.reset();
      },
    });
  }
}
