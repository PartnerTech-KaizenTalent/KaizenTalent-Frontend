import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: []
})
export class Error403Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  redirectTo(){
    window.location.href = '/index'
  }

}
