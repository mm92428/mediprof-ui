import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HttpStatusCode } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import { JwtService } from '../../services/utils/jwt.service';
import { PaginationQueryDto } from 'src/app/data/Dto/request.query.dto';
import { UserDto } from '../../data/Dto/user/user.dto';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'hms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users!: UserDto[] | undefined;
  successMessage!: string | null;
  errorMessage!: string;
  IsFetching: boolean = false;
  IsDeleting: boolean = false;
  username?: string;
  token!: any;
  defaultImgPath: string = '../../../assets/img/doctors/doctors-1.jpg';
  mailto: string = 'mailto:';
  page = 1;
  limit = 10;
  totalItems!: number;
  infoMessage!: string;

  constructor(
    private userService: UserService,
    private clipboard: Clipboard,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.token = this.jwtService.decodeJwtToken();
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.infoMessage = '';
    }, timeOut);
  }

  copyText(text: string) {
    this.clipboard.copy(text);
  }

  private getUsers(
    query: PaginationQueryDto = { page: 1, keyword: '', limit: 10 }
  ): void {
    this.IsFetching = true;
    this.userService.getUsers(query).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.users = res.data;
          this.successMessage = `${res?.data?.length} users was found.`;
          this.IsFetching = false;
        } else if (res.data == null) {
          this.infoMessage = 'This are the last contacts in the contact list';
          this.IsFetching = false;
          this.setTimeOut(4000);
        } else {
          this.errorMessage =
            'Sorry something unexpected happened while fetching you message try again';
          this.IsFetching = false;
          this.setTimeOut(5000);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message.message;
        this.IsFetching = false;
      },
    });
  }

  pageChanged(event: PageEvent) {
    const query: PaginationQueryDto = {
      page: event.pageIndex + 1,
      keyword: '',
      limit: this.limit,
    };
    this.getUsers(query);
    window.scrollTo(0, 0);
  }

  deleteUser(msgId: string): void {
    this.IsDeleting = true;
    this.userService.deleteUser(msgId).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.successMessage = res.message;
          this.IsDeleting = false;
          this.setTimeOut(3000);
        }
        this.IsDeleting = false;
        this.setTimeOut(3000);
      },
      error: (err) => {
        this.errorMessage = err.error.message.message;
        this.IsDeleting = false;
        this.setTimeOut(3000);
      },
    });
  }
}
