import { JwtService } from './../../services/utils/jwt.service';
import { UserDto } from '../../data/Dto/user/user.dto';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'hms-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  IsOpen!: boolean;
  IsMobile!: boolean;
  user!: any | null;
  token!: any;

  constructor(private jwtService: JwtService) {}

  ngOnInit(): void {
    this.handleWindowResize();
    this.token = this.jwtService.decodeJwtToken();
    this.user = this.token.data;
  }

  toggle(): void {
    this.IsOpen = !this.IsOpen;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.handleWindowResize();
  }

  handleWindowResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      this.IsMobile = true;
    } else {
      this.IsMobile = false;
    }
  }
}
