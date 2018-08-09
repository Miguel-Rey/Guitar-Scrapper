import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SingleTabComponent } from './single-tab/single-tab.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchHolderComponent } from './search-holder/search-holder.component';
import { TunerComponent } from './tuner/tuner.component';
import { TopChartsComponent } from './top-charts/top-charts.component';
import { IsLoggedGuardService } from '../services/enter-details-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [IsLoggedGuardService]},
  { path: 'single/:id', component: SingleTabComponent, canActivate: [IsLoggedGuardService]},
  { path: 'favourites', component: ProfileComponent, canActivate: [IsLoggedGuardService]},
  { path: 'search/:query', component: SearchHolderComponent, canActivate: [IsLoggedGuardService]},
  { path: 'tuner', component: TunerComponent, canActivate: [IsLoggedGuardService]},
  { path: 'charts', component: TopChartsComponent, canActivate: [IsLoggedGuardService]}
];
