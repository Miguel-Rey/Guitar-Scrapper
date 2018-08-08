import { Component, OnInit } from "@angular/core";
import { ChordsService } from "../../services/chords";
import { Router } from "@angular/router";
import { SessionService } from "../../services/session";
import { forkJoin } from "rxjs";
import { LastFMService } from "../../services/lastfm";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  searchResult: Array<object> = [];
  userFavourites: Array<string>;
  topTracks: Array<any> = [];
  topArtist: Array<any> = [];
  topGeo: Array<any> = [];

  constructor(
    private ChordsService: ChordsService,
    private SessionService: SessionService,
    private router: Router,
    private LastFMService: LastFMService
  ) {
    this.SessionService.isLogged().subscribe(user => {
      this.userFavourites = user.favourites;
    });
  }

  ngOnInit() {
    this.getTopTracks();
    this.getTopArtist();
    this.getGeoTopTracks();
  }

  
  
  searchTop(query){
    let sanitizedQuery = query.split(' ').join('_')
    this.router.navigate(["/search", sanitizedQuery]);
  }


  getSingleChord(url) {
    const replaceLong = "https://tabs.ultimate-guitar.com/".length;
    const id = url
      .slice(replaceLong)
      .split("/")
      .join("__");
    this.router.navigate(["/single", id]);
  }

  getTopTracks() {
    this.LastFMService.getTopTracks().subscribe(data => {
      for(let i = 0; i < 3; i++){
        this.topTracks.push(data.tracks.track[i]);
      }
    })
  }
  getTopArtist(){
    this.LastFMService.getTopArtist().subscribe(data => {
      for(let i = 0; i < 3; i++){
        this.topArtist.push(data.artists.artist[i]);
      }
    })
  }

  getGeoTopTracks(){
    this.LastFMService.getGeoTopTracks().subscribe( data => {
      for(let i = 0; i < 3; i++){
        this.topGeo.push(data.tracks.track[i]);
      }
    })
  }


}
