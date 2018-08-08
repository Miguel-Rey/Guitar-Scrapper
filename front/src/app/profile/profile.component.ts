import { Component, OnInit, EventEmitter } from "@angular/core";
import { SessionService } from "../../services/session";
import { ChordsService } from "../../services/chords";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  userFavourites;

  constructor(
    private SessionService: SessionService,
    private ChordsService: ChordsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFavourites();
  }

  getFavourites() {
    this.SessionService.isLogged().subscribe(user => {
      let favourites = [];
      user.favourites.forEach(e => {
        favourites.push(this.ChordsService.getChordByUrl(e));
      });
      forkJoin(favourites).subscribe( 
        favouritesArray => {
          this.userFavourites = favouritesArray;
        },
        err => {
          console.log(err);
        });
    })
  }

  getSingleChord(url){
    const replaceLong = 'https://tabs.ultimate-guitar.com/'.length
    const id = url.slice(replaceLong).split('/').join('__');
    this.router.navigate(['/single',id])
  }

  deleteFavourite(favourites){
    if(this.userFavourites.indexOf(favourites) > -1){
      this.userFavourites.splice(this.userFavourites.indexOf(favourites), 1);
    }
    this.ChordsService.deleteFavourite(favourites.url).subscribe( data => {
    });
  }

  isFavourite(url) {
    return this.userFavourites.includes(url);
  }

  searchTop(query) {
    let sanitizedQuery = query.split(" ").join("_");
    this.router.navigate(["/search", sanitizedQuery]);
  }
}
