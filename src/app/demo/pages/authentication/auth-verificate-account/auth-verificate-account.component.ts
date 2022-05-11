import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-signin/service/auth.service';
import { NewUser, Status, StatusChecking, User } from '../auth-signin/service/user';
declare var require;
const randomWords = require('random-words');

@Component({
  selector: 'app-auth-verificate-account',
  templateUrl: './auth-verificate-account.component.html',
  styleUrls: ['./auth-verificate-account.component.scss']
})
export class AuthVerificateAccountComponent implements OnInit {


  form : FormGroup;
  acceptform : FormGroup;
  seePassword = false;
  type : string = "password";
  formNumber : number = 1;
  formatNumber = "+62";
  randomText = randomWords(1).toString();
  isLogin = false;


  constructor(private formBuilder : FormBuilder, 
    private toastr : ToastrService, 
    private renderer : Renderer2, 
    private service : AuthService, 
    private httpKlien : HttpClient,
    private router : Router) { 
      this.acceptform = this.formBuilder.group({
        verificateCode : this.formBuilder.control(null)
      })
    }

  ngOnInit(): void {
  }

  submit(){
    document.getElementById('login-loader').style.display = 'inline';
    document.getElementById('loader-text').style.display = 'none';
      let values = new NewUser();
      values.userName = localStorage.getItem('username');
      const userPassword = localStorage.getItem('password');
      this.service.verify(values).subscribe(response => {
        this.checkAccount(values.userName, userPassword);
      })
  }

  checkAccount(username: string, password: string){
    const userAdmin = new User();
    userAdmin.userName = username;
    userAdmin.userPassword = password;
    this.httpKlien.post(environment.urlAuth  + '/auth/check-account', userAdmin
    ).pipe(map(data => data as StatusChecking))
    .subscribe( data => {
        if(data.status !== "Username is not valid"){
          if(data.status !== "Password is not correct"){
            if(data.status !== "Account must verified"){
              this.login(username, password);
            }else{
              this.toastr.error("Some Error", data.status);
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
            }
          } else{
            this.toastr.error("Some Error", data.status);
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
          }
        }else{
          this.toastr.error("Some Error", data.status);
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        }
    });
  }

  login(username: string, password: string): void{
    document.getElementById('login-loader').style.display = 'inline';
    document.getElementById('loader-text').style.display = 'none';
    const userAdmin = new User();
    userAdmin.userName = username;
    userAdmin.userPassword = password;
    this.httpKlien.post(environment.urlAuth  + '/auth/login', userAdmin
    ).pipe(map(data => data as Status))
    .subscribe( data => {
        this.isLogin = data.isValid;
        if(this.isLogin){

            localStorage.removeItem('username');
            localStorage.removeItem('username');
            localStorage.setItem('token', data.token);
            localStorage.setItem('fullName', data.fullName);
            this.toastr.success("Akun Berhasil Terdaftar");
            this.router.navigate(['/dashboard/default']);
            document.getElementById('login-loader').style.display = 'none';
            document.getElementById('loader-text').style.display = 'inline';
        } else {
          this.toastr.error("Terjadi kesalahan");
          localStorage.removeItem('username');
          localStorage.removeItem('username');
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        }
    });
  }


}
