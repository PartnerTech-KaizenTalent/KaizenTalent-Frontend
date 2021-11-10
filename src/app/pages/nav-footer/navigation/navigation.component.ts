import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { PasswordRequest } from '../../reset_password/password-request/password-request-interface';
import { PasswordRequestService } from '../../reset_password/password-request/password-request.service';

declare const $:any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent implements OnInit {

  basicinfoData: any = {};
  passwordrequestData: any = {};
  message:any;
  errorMessage = '';


  UsuarioToken:any;
  
  isMostrar = false;
  isMostrarIngresar = true;
  cerrarSesion = false;
  MostrarAlert = false;

  loginPostulante = false;
  perfilPostulante = false;
  misPostulaciones = false;

  loginReclutador = false;
  perfilReclutador = false;
  publicarEmpleo = false;  
  misPublicaciones = false;

  salir : any;
  expirar: any;
  expiradaso: any;
  bpostulante: any;
  reclutador: any;
  postulante: any;
  idr: any;
  idp: any;

  constructor(private tokens: TokenStorageService,
              private router:Router,
              private passwordrequestService: PasswordRequestService,private config: NgbModalConfig, private modalService: NgbModal
              ) { }

  ngOnInit(): void {
    this.general();
    this.Expirado();
    this.MovimientoToken();
    this.MenuNavbar();
  }

  open(content:any) {
    this.modalService.open(content);
  }
  
  general(){

    this.UsuarioToken = this.tokens.getUser();
    

    if(this.UsuarioToken.token){
      this.UsuarioToken = this.tokens.getUser();
      var a = this.UsuarioToken.authorities[0];

      switch (a.authority) {
        case 'ROLE_RECLUTADOR':   
            this.reclutador = a.authority;   
            this.idr = this.UsuarioToken.idUsuario    
          break;
        case 'ROLE_POSTULANTE': 
            this.postulante = a.authority;
            this.idp = this.UsuarioToken.idUsuario
          break;      
        default:
          break;
      }

      if(this.reclutador !== undefined ){   
        this.isMostrar = true;
        this.isMostrarIngresar = false;
        this.cerrarSesion = true;  
        this.publicarEmpleo = true;  
        this.perfilReclutador = true; 
        this.misPublicaciones = true;
      }          

      if(this.postulante !== undefined ){       
        this.isMostrar = true;
        this.isMostrarIngresar = false;
        this.cerrarSesion = true;
        this.perfilPostulante = true;
        this.misPostulaciones = true;  
      }
    }

    if(this.tokens.getToken() === null || this.reclutador == "" || this.postulante == ""){
      this.tokens.signOut();
      this.loginPostulante = true;
      this.loginReclutador = true;       
    }
  }            
 
  Salir(){
    this.salir = this.tokens.getUser();

      var a = this.salir.authorities[0];

      switch (a.authority) {
        case 'ROLE_RECLUTADOR':   
            this.reclutador = a.authority;  
                 
          break;
        case 'ROLE_POSTULANTE': 
            this.postulante = a.authority;
          break;      
        default:
          break;
      }

    if(this.reclutador !== undefined){
      this.tokens.signOut();
      window.location.href ='/signin/reclutador';
    }else{
      this.tokens.signOut();
      window.location.href = '/signin/postulante';
    }    
  }

  //Poner en cada html el id de target
  MovimientoToken(){
    $('#target').mousemove( () => {
      this.Expirado();
    });
  }

  TokenExpired(token: string) {    
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry; 
}
  
  Expirado(){
    this.BtnAlerclose();
    if(this.UsuarioToken.token != null){
        if (this.TokenExpired(this.UsuarioToken.token)) {
          this.expiradaso =  'expirado';
          this.MostrarAlert = true;
        } else {
          this.expiradaso =  'valido';
        }
    }
    if(this.UsuarioToken.token == null || this.UsuarioToken.token == undefined){}     
  }

  
  BtnAlerclose(){
    if(this.expiradaso == 'expirado'){

      this.UsuarioToken = this.tokens.getUser();
      var a = this.UsuarioToken.authorities[0];

      switch (a.authority) {
        case 'ROLE_RECLUTADOR':   
            this.reclutador = a.authority;       
          break;
        case 'ROLE_POSTULANTE': 
            this.postulante = a.authority;
          break;      
        default:
          break;
      }

      if(this.postulante !== undefined){
        this.tokens.signOut();
        window.location.href ='/signin/postulante';
      }
      if(this.reclutador !== undefined){
        this.tokens.signOut();
        window.location.href = '/signin/reclutador';
      }
    }
  }

  MenuNavbar(){
    $('.navbar-toggle').on('click',  (event:any) => {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
  });
  
  $('.navigation-menu>li').slice(-1).addClass('last-elements');
  
  $('.menu-arrow,.submenu-arrow').on('click',  (e:any) => {
      if ($(window).width() < 992) {
          e.preventDefault();
          $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
  });

  // Menu Clickeable
  $(".has-submenu a").click(() => {
      if(window.innerWidth < 992){
          if($(this).parent().hasClass('open')){
              $(this).siblings('.submenu').removeClass('open');
              $(this).parent().removeClass('open');
          } else {
              $(this).siblings('.submenu').addClass('open');
              $(this).parent().addClass('open');
          }
      }
  });

  $('.mouse-down').on('click', (event:any) => {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - 0
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });
  }

  PasswordRequest(): void{
    this.bpostulante = this.tokens.getEmail();  

    var passwordRequest: PasswordRequest = {
      emailUsuario:  this.bpostulante
    }
    

    this.passwordrequestService.PasswordRequest(passwordRequest).subscribe(
      data => {
        
        this.passwordrequestData = data;
        localStorage.setItem('passwordresetToken', this.passwordrequestData.passwordresetToken);
        this.message = "Se le ha enviado un enlace para que restablezca su contraseña. Por favor, revise su bandeja de entrada.";
        this.tokens.saveCont(this.message);

      },
      err => {
        this.errorMessage = err.error.message;
        this.message = this.errorMessage;
      }
    )
  }

  empezarBusqueda(): void {    
    var usuario: any = {
      puestotrabajo: '',
      ciudad: '',
      categoria: ''   
    }    
    this.tokens.saveTokenBusqueda(usuario);       
    window.location.href='/empleos';
  }
  
  
  
}
