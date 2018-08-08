import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "rattingPipe"
})
export class RattingPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(input): any {
    let result= '';
    for(let i=1; i < input; i++){
      result+='<span class="icon-star-full"></span>'
    }
    let decimal = Math.round((input - Math.floor(input))*10)
    decimal > 5 ? result+='<span class="icon-star-half"></span>' : result+='<span class="icon-star-empty"></span>';
    for(let i= Math.floor(input); i < 4; i++){
      result+='<span class="icon-star-empty"></span>'
    }
    return result
  }
}
