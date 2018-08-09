import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session";
import { ChordsService } from "../../services/chords";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
  selector: "app-search-holder",
  templateUrl: "./search-holder.component.html",
  styleUrls: ["./search-holder.component.scss"]
})
export class SearchHolderComponent implements OnInit {

  searchResult: Array<object> = [];
  suggestions: Array<string>;
  page: number;
  prevQuery: string;
  userFavourites: Array<string>;
  isLoadingMore =  false;

  constructor(
    private SessionService: SessionService,
    private ChordsService: ChordsService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.SessionService.isLogged().subscribe(user => {
      this.userFavourites = user.favourites;
    });
    this.ActivatedRoute.params.subscribe( params => {
      let desanitizedQuery = params.query.split('_').join(' ')
      this.search(desanitizedQuery);
    })
    this.page = 2;
  }

  search(query: string) {
    this.searchResult = [];
    this.ChordsService.searchChords(query, 1).subscribe(data => {
      this.searchResult = data;
      this.prevQuery = query;
      this.page = 2;
    });
  }
  addFavourite(url) {
    this.userFavourites.push(url);
    this.ChordsService.addFavourite(url).subscribe(data => {
    });
  }

  deleteFavourite(url) {
    this.userFavourites.splice(this.userFavourites.indexOf(url), 1);
    this.ChordsService.deleteFavourite(url).subscribe(data => {});
  }

  isFavourite(url) {
    return this.userFavourites.includes(url);
  }
  getSingleChord(url) {
    const replaceLong = "https://tabs.ultimate-guitar.com/".length;
    const id = url
      .slice(replaceLong)
      .split("/")
      .join("__");
    this.router.navigate(["/single", id]);
  }

  searchMore(query: string) {
    this.isLoadingMore = true;
    this.ChordsService.searchMore(query, this.page).subscribe(data => {
      if(data.status === 404 || Object.keys(data).length === 0){
        document.getElementById('more-results').innerText = 'No more results!'
        document.getElementById('more-results').setAttribute('disabled','true');
      } else {
        this.searchResult = this.searchResult.concat(data);
      }
      this.isLoadingMore = false;
    });
  }

  getSearchSuggestions(query) {
    if (query.length > 3) {
      this.ChordsService.getSuggestions(query).subscribe(data => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = null;
    }
  }

  searchTop(query) {
    let sanitizedQuery = query.split(" ").join("_");
    this.router.navigate(["/search", sanitizedQuery]);
  }
}
