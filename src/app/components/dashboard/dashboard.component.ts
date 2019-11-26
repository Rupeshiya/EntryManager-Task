import { CheckServiceService } from './../../services/check-service.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public checkIn: String;
  public emailOfVisitor: String;
  public checksOut: String;
  public nameOfVisitor: String;
  public phoneOfVisitor: String;
  public isSent: Boolean;
  public isCheckIn: Boolean = true;
  public isCheckedOut: Boolean;

  constructor(
    private atp: AmazingTimePickerService,
    private checkInOutService: CheckServiceService
  ) // private spinner: NgxUiLoaderService
  {}

  ngOnInit() {}

  onCheckInClick() {
    const amazingTime = this.atp.open();
    amazingTime.afterClose().subscribe(time => {
      this.checkIn = time;
      console.log("checkIn ", this.checkIn);
    });
  }
  onCheckOutClick() {
    const amazingTime = this.atp.open();
    amazingTime.afterClose().subscribe(time => {
      this.checksOut = time;
      console.log("checkOut ", this.checksOut);
    });
  }
  onCheckInSubmit() {
    const checksInInfo = {
      vistorPhone: this.phoneOfVisitor,
      vistorCheckIn: this.checkIn
    };
    // this.spinner.start();
    this.checkInOutService.checkInSubmit(checksInInfo).subscribe(res => {
      console.log(res);
      if (res.success) {
        // this.spinner.stop();
        console.log(res.msg);
        this.isSent = true;
        this.isCheckIn = false;
      }
    });
  }
  onCheckOutSubmit(){
    const checkOutInfo = {
      checkout: this.checksOut
    };
    this.checkInOutService.checkInSubmit(checkOutInfo).subscribe((res)=>{
      if(res.success){
        console.log('successfully checked out!');
        this.isCheckedOut = true;
      }
    })
  }
}
