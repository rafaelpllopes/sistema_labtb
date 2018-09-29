import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  loginForm: FormGroup;
  fromUrl: string;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => this.fromUrl = params['fromUrl']);

    this.loginForm = this.formBuilder.group({
      userName: ['admin', Validators.required],
      password: ['admin', Validators.required]
    });

    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
  }

  login() {
    let user = this.loginForm.get('userName').value;
    let senha = this.loginForm.get('password').value;
    this.authService.autenticar(user, senha)
      .subscribe(() =>
        this.router.navigateByUrl(this.fromUrl)
        ,
        err => {
          console.log(err);
          this.loginForm.reset();
          this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
          alert('Usuario ou senha invalido');
        });
  }
}
