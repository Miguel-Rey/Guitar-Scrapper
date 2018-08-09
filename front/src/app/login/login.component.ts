import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private sessionService:SessionService, private router: Router) { }

  ngOnInit() {
  }

  login(username:string, password:string){
    this.sessionService.login(username,password).subscribe( user => {
      this.router.navigate(['/'])
    });
  }

}
