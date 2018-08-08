import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;


@Injectable()
export class LastFMService {

  options:object = {withCredentials:true};

  constructor(private http:Http) {
  }

  getSimilarTracks(artist,song){
    let sanitizeArtist = artist.split(' ').join('_')
    let sanitizeSong = song.split(' ').join('_')
    return this.http.get(`${BASEURL}/api/lastfm/similar/${sanitizeArtist}/${sanitizeSong}`).pipe(
      map ( (res:Response) => {
        return res.json();
      }),
      catchError ( e => {console.log('Error'); return of(e)})
    )
  }

  getTopTracks(){
    return this.http.get(`${BASEURL}/api/lastfm/top`).pipe(
      map ( (res: Response) => {
        return res.json();
      }),
      catchError ( e => {console.log('Error'); return of (e)})
    )
  }

  getTopArtist(){
    return this.http.get(`${BASEURL}/api/lastfm/artist`).pipe(
      map ( (res: Response) => {
        return res.json();
      }),
      catchError ( e => {console.log('Error'); return of (e)})
    )
  }

  getArtistInfo(artist){
    return this.http.get(`${BASEURL}/api/lastfm/info/${artist}`).pipe(
      map ( (res:Response) => {
        return res.json();
      })
    )
  }

  getTrackInfo(artist, song){
    return this.http.get(`${BASEURL}/api/lastfm/info/song/${artist}/${song}`).pipe(
      map ( (res: Response) => {
        return res.json()
      })
    )
  }

  getGeoTopTracks(){
    return this.http.get(`${BASEURL}/api/lastfm/geo/song`).pipe(
      map ( (res: Response) => {
        return res.json()
      })
    )
  }

}
