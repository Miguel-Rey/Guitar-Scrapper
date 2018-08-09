import { CanActivate, Router } from '@angular/router';
import { Injectable }  from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { SessionService } from './session';
import { map } from '../../node_modules/rxjs/operators';

@Injectable()
export class IsLoggedGuardService implements CanActivate {
  constructor(private SessionService: SessionService, private router: Router){}
  canActivate(): Observable<boolean>{
    console.log('canActivate guard has been called');
    return this.SessionService.isLogged().pipe(
      map( res=> {
        if(res.status === 403){
          this.router.navigate(['/login'])
          return false
        } else {
          return true
        }
      })
    )
  }
}