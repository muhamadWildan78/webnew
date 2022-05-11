import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-signin/service/auth.service';
import { NewUser, Status, StatusChecking, User } from '../auth-signin/service/user';
declare var require;
const randomWords = require('random-words');

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

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
    private router : Router,
    private titleService : Title) {
    this.form = this.formBuilder.group({
      userName: this.formBuilder.control(null, [Validators.required]),
      userPassword: this.formBuilder.control(null, [Validators.required]),
      retypePassword: this.formBuilder.control(null, [Validators.required]),
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      gender: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phoneNumber: this.formBuilder.control(null, [Validators.required]),
      birthDate: this.formBuilder.control(null, [Validators.required]),
      accept: this.formBuilder.control(null)
    });

    this.acceptform = this.formBuilder.group({
      verificateCode : this.formBuilder.control(null)
    })
   }

  ngOnInit() {


    this.titleService.setTitle('Sign Up' + ' | Checkpoint App');
    
  }

  verification(){
    if(this.form.get("retypePassword").touched && this.form.value.retypePassword != this.form.value.userPassword){
      console.log("true");
      document.getElementById("confirmPassword").style.borderColor = "red";
    }
  }

  submit(){
    document.getElementById('login-loader').style.display = 'inline';
    document.getElementById('loader-text').style.display = 'none';
    let value = new NewUser();
    value.firstName = this.form.value.firstName;
    value.lastName = this.form.value.lastName;
    value.userName = this.form.value.userName;
    value.userPassword = this.form.value.userPassword;
    value.gender = this.form.value.gender;
    value.email = this.form.value.email;
    value.phoneNumber = this.formatNumber+this.form.value.phoneNumber;
    value.birthDate = this.form.value.birthDate;
    this.service.register(value).subscribe(response => {
      let values = new NewUser();
      values.userName = this.form.value.userName;
      this.service.verify(values).subscribe(response => {
        this.checkAccount(value.userName, value.userPassword);
      })
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
            localStorage.setItem('token', data.token);
            this.toastr.success("Akun Berhasil Terdaftar");
            this.service.getData( userAdmin.userName, userAdmin.userPassword).subscribe(data =>{
              localStorage.setItem( "currentLogin", JSON.stringify(data.body));
              this.router.navigate(['/dashboard/default']);
              document.getElementById('login-loader').style.display = 'none';
              document.getElementById('loader-text').style.display = 'inline';
            })
        } else {
          this.toastr.error("Terjadi kesalahan");
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        }
    });
  }


  prevForm(){
    this.formNumber = 1;
  }

  nextForm(){
    if(this.form.get("firstName").valid && this.form.get("lastName").valid && this.form.get("userName").valid &&
    this.form.get("userName").valid && this.form.get("userPassword").valid && this.form.get("gender").valid && 
    this.form.get("email").valid && this.form.get("phoneNumber").valid && this.form.get("birthDate").valid){
      if(this.form.value.retypePassword != this.form.value.userPassword){
        this.toastr.error("Verify password must be same");
      }else {
        this.formNumber = 2;
      }
    } else {
      this.toastr.error("Form Harus di isi lengkap");
    }
  }

  showPassword(){
    this.seePassword = true;
    this.type = "text";
  }

  hidePassword(){
    this.seePassword = false;
    this.type = "password";
  }

}
