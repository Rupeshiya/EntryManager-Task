import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { users } from 'src/app/interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(profile => {
      console.log('profile info-', profile);
      this.user = profile;
    });
    // this.user = this.authService.getUsersLocalStorage();
    // console.log('user from local storage -',this.user);
  }

}
