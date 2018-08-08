import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;


@Injectable()
export class ChordsImageService {

  constructor(private http:Http) {
  }

  getChordImages(note){
    return this.http.get(`${BASEURL}/api/chords/chordimage/${note.replace('#','___')}`).pipe(
      map ( (res:Response) => {
        return res.json()
      })
    )
  }


}
