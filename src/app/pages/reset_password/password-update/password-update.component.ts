import { Component, OnInit } from '@angular/core';
import { PasswordUpdateService } from './password-update.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../tools/custom-validators';
import { PasswordUpdate } from './password-update-interface';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: [],
  styles: [
    `
    :host >>> .alert-valid {
      color: #ffffff;
      background-color: #2f55d4;
      border-color: #2f55d4;
      text-align: justify;
    }

    :host >>> .alert-invalid {
      color: #ffffff;
      background-color: #dc3545;
      border-color: #dc3545;
      text-align: justify;
    }
  `
  ]
})
export class PasswordUpdateComponent implements OnInit {

  passwordupdateData: any = {};

  alert: any = {};

  errorMessage: any = {};

  token = localStorage.getItem('passwordresetToken');

  public passwordupdateForm = this.fb.group({
    contrasenia: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#$:\^%&]/, {passwordspecialcharacter: true})
    ])),
    confirmcontrasenia: new FormControl('')
  }, { validator: CustomValidators.passwordMatchValidator("contrasenia", "confirmcontrasenia") })

  constructor(private passwordupdateService: PasswordUpdateService,
              private fb: FormBuilder,
              private router: Router,
              private tokenstorage:TokenStorageService) { }

  ngOnInit(): void {}

  //link   (29)    
  //local
  //this.token = location.href.slice(39); 
  //producción     
  // location.href.slice(46); 

  PasswordUpdate(): any {

    this.token = location.href.slice(39)

    var passwordUpdate: PasswordUpdate = {
      passwordUsuario: this.passwordupdateForm.controls['contrasenia'].value,
      utilityToken: this.token || ""
    }
    
    this.passwordupdateService.PasswordUpdate(passwordUpdate).subscribe(
      data => {
        this.errorMessage = data.message;
      },

      err => {
        this.errorMessage = err.error.message;
        this.alert.type = 'invalid';
        this.alert.message = this.errorMessage;
      }
    )
  }
}
