import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { ChordsService } from '../services/chords';
import { SingleTabComponent } from './single-tab/single-tab.component';
import { ChordPipe } from './pipes/chord.pipe';
import { ChordsImageService } from '../services/chordImage';
import { ProfileComponent } from './profile/profile.component'
import { ChordContentComponent } from './chord-content/chord-content.component';
import { LastFMService } from '../services/lastfm';
import { SearchHolderComponent } from './search-holder/search-holder.component';
import { TunerComponent } from './tuner/tuner.component';
import { TopChartsComponent } from './top-charts/top-charts.component';
import { RattingPipe } from './pipes/ratting.pipe';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { IsLoggedGuardService } from '../services/enter-details-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SingleTabComponent,
    ChordPipe,
    RattingPipe,
    ProfileComponent,
    ChordContentComponent,
    SearchHolderComponent,
    TunerComponent,
    TopChartsComponent,
    StopPropagationDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [SessionService, ChordsService, ChordsImageService, LastFMService, IsLoggedGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
