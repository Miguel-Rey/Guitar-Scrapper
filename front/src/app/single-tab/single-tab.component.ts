import { Component, OnInit } from "@angular/core";
import { ChordsService } from "../../services/chords";
import { ActivatedRoute, Router } from "@angular/router";
import { ChordsImageService } from "../../services/chordImage";
import { DomSanitizer } from "@angular/platform-browser";
import { SessionService } from "../../services/session";
import { LastFMService } from "../../services/lastfm";

@Component({
  selector: "app-single-tab",
  templateUrl: "./single-tab.component.html",
  styleUrls: ["./single-tab.component.scss"]
})
export class SingleTabComponent implements OnInit {
  chord: object = {};
  SecureChord: object;
  userFavourites: Array<string> = [];
  versions: Array<any> = [];
  recomended: Array<any> = [];
  artistInfo;
  showTuner = false;
  constructor(
    private ChordsService: ChordsService,
    private paramsRouter: ActivatedRoute,
    private SessionService: SessionService,
    private LastFMService: LastFMService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.SessionService.isLogged().subscribe(user => {
      this.userFavourites = user.favourites;
    })
    this.paramsRouter.params.subscribe(params => {
      const parsedId =
        "https://tabs.ultimate-guitar.com/" + params.id.split("__").join("/");
      this.ChordsService.getChordByUrl(parsedId).subscribe(data => {
        this.chord = data;
        this.getVersions(data.name, data.artist);
        this.getSimilarTracks(data.artist, data.name);
      });
    });
  }

  addFavourite(url){
    this.userFavourites.push(url);
    this.ChordsService.addFavourite(url).subscribe()
  }
  
  deleteFavourite(url){
    this.userFavourites.splice(this.userFavourites.indexOf(url), 1);
    this.ChordsService.deleteFavourite(url).subscribe( data => {
    });
  }
  
  isFavourite(url){
    return this.userFavourites.includes(url)
  }
  
  getVersions(query:string, artist: string){
    this.ChordsService.searchChords(query, 1).subscribe( data => {
      this.versions = data.filter(e => e.name === query && e.artist === artist)
    })
  }
  getSimilarTracks(artist, song){
    this.LastFMService.getSimilarTracks(artist, song).subscribe(data => {
      if(!data.hasOwnProperty('error')){
        let long = data.similartracks.track.length < 10 ? data.similartracks.track.length : 10;
        for( let i = 0; i < long; i++){
          this.ChordsService.searchChords(data.similartracks.track[i].name, 1).subscribe(data => {
            if(data.length > 0){
              this.recomended.push(data[0]);
            }
          })
        }
      }
    });
  }

  getSingleChord(url){
    const replaceLong = 'https://tabs.ultimate-guitar.com/'.length
    const id = url.slice(replaceLong).split('/').join('__');
    this.router.navigate(['/single',id])
  }

  getArtistInfo(artist){
    this.LastFMService.getArtistInfo(artist).subscribe( data => {
      this.artistInfo = data
    })
  }
  searchTop(query) {
    let sanitizedQuery = query.split(" ").join("_");
    this.router.navigate(["/search", sanitizedQuery]);
    document.getElementById('search-suggestions').classList.remove('show');
  }

  toggleTunner(){
    this.showTuner = !this.showTuner;
    let mask = document.getElementById('tuner-mask')
    if(mask.classList.contains('show')){
      mask.classList.remove('show')
    } else {
      mask.classList.add('show')
    }
  }
}

