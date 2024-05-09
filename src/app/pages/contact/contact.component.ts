import { ContactDto } from './../../data/Dto/contact.dto';
import { ContactService } from '../../services/contact/contact.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'hms-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm!: FormGroup;
  contactDto!: ContactDto;
  errorMessage!: string | null;
  successMessage!: string | null;
  IsLoading!: boolean;
  iframeUrl!: SafeResourceUrl;
  IsLoadingIframe!: boolean;

  constructor(
    private contactService: ContactService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', [Validators.required]),
    });
    this.loadIframe();
  }

  loadIframe(): void {
    this.IsLoadingIframe = true;
    setTimeout(() => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.9692859230395!2d-105.99181952506835!3d38.53447616803813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x871517e89655688f%3A0xd9ab3b3176b6730e!2s327%20E%201st%20St%2C%20Salida%2C%20CO%2081201%2C%20USA!5e0!3m2!1sen!2sng!4v1691056148385!5m2!1sen!2sng'
      );
      this.IsLoadingIframe = false;
    }, 2000);
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, timeOut);
  }
  getControl(name: string): AbstractControl | null {
    return this.contactForm.get(name);
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    return this.contactForm.get(controlName)?.hasError(errorName);
  }

  onSubmit(): void {
    this.contactDto = this.contactForm.value;
    this.IsLoading = true;
    this.contactService.contact(this.contactDto).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.successMessage = res.message;
          this.IsLoading = false;
          this.setTimeOut(4000);
          this.contactForm.reset();
        } else {
          this.errorMessage = res.message?.message;
          this.IsLoading = false;
          this.setTimeOut(4000);
          this.contactForm.reset();
        }
      },
      error: (err) => {
        this.errorMessage = err.message.message;
        this.IsLoading = false;
        this.setTimeOut(3000);
        this.contactForm.reset();
      },
    });
  }
}
