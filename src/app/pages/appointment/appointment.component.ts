import { PaymentDto } from './../../data/Dto/payment.dto';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'hms-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  errorMessage!: string | null;
  successMessage!: string | null;
  IsLoading!: boolean;
  paymentForm!: FormGroup;
  paymentDto!: PaymentDto;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      amount: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.paymentForm;
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, timeOut);
  }

  getControl(name: string): AbstractControl | null {
    return this.paymentForm.get(name);
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    return this.paymentForm.get(controlName)?.hasError(errorName);
  }

  initializePayment(): void {
    this.paymentService
      .initializePayment(this.paymentForm.value)
      .subscribe((response) => {
        // This line will open the Paystack payment dialog
        window.location.href = response.data.authorization_url;
      });
  }

  verifyPayment(reference: string): void {
    this.paymentService.verifyPayment(reference).subscribe((response) => {
      if (response.data.status === 'success') {
        // Payment was successful, handle as appropriate
        console.log('Payment was successful');
      } else {
        // Payment was not successful, handle as appropriate
        console.log('Payment was not successful');
      }
    });
  }

  onSubmit(): void {
    this.IsLoading = true;
    this.paymentDto = this.paymentForm.value;
    this.paymentService.initializePayment(this.paymentDto).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.successMessage = res.message;
          this.IsLoading = false;
          this.setTimeOut(4000);
        } else {
          this.errorMessage = res.message?.message;
          this.IsLoading = false;
          this.setTimeOut(4000);
        }
      },
      error: (err) => {
        this.errorMessage = err.message.message;
        this.IsLoading = false;
        this.setTimeOut(3000);
      },
    });
  }
}
