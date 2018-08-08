import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "chordify"
})
export class ChordPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(input: string): any {
    if (!input) {
      return "";
    }
    const chordTransformer = e => {
      let chord = e.replace("[ch]", "").replace("[/ch]", "");
      let rootNote = chord.slice(0,1);
      if(chord.slice(1,2) == '#'){
        rootNote = chord.slice(0,2);
      }
      let sufix = chord.slice(rootNote.length);
      return `<span class="chord ${chord}"><span class="rootNote">${rootNote}</span><span class="sufix">${sufix}</span></span>`
    };
    let newChord = input;
    let chordArr = input.match(/\[ch\](.*?)\[\/ch\]/g);
    chordArr.forEach(e => {
      newChord = newChord.replace(e, chordTransformer(e));
    });
    return this.sanitizer.bypassSecurityTrustHtml(newChord);
  }
}
