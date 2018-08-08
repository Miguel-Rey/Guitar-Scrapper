import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { ChordsImageService } from '../../services/chordImage';

@Component({
  selector: 'app-chord-content',
  templateUrl: './chord-content.component.html',
  styleUrls: ['./chord-content.component.scss']
})
export class ChordContentComponent implements OnChanges {
  @Input() chord: any;
  isScrollActivated = true;
  intervalID;
  scrollConfig = {
    interval: 10
  }
  showTuner = false;
  popupImages = [];
  popupName;
  popupSettings = {
    x: 0,
    y: 0,
    length: 0,
    current: 0
  }

  constructor(private elRef:ElementRef, private ChordsImageService: ChordsImageService) { 
    
  }

  ngOnInit() {
  }
  ngOnChanges(){
  }
  ngAfterViewInit() {
    this.setEvents();
   }

  setEvents() {
    let ChordComponent = this;
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach( e => {
      e.addEventListener('click', function(e){
        ChordComponent.popupSettings.x = e.pageX;
        ChordComponent.popupSettings.y = e.pageY;
        ChordComponent.showChord(e.path[1]);
        let positions = `left:${ChordComponent.popupSettings.x}px; top:${ChordComponent.popupSettings.y}px`;
        ChordComponent.elRef.nativeElement.querySelectorAll('.chord-popup.show')[0].setAttribute('style',positions)
      })
      // e.addEventListener('mouseout', function(e){
      //   ChordComponent.hideChord();
      // })
    })
    document.getElementById('trasposeUp').addEventListener('click', ()=>{
      this.traposeChordsUp();  
    })
    document.getElementById('trasposeDown').addEventListener('click', ()=>{
      this.traposeChordsDown();  
    })
    document.getElementById('autoscroll').addEventListener('click', ()=>{
      this.scrollTo();   
    })
    document.addEventListener('keydown', function(e){
      if(e.keyCode == 40){
        e.preventDefault();
        ChordComponent.speedDownScroll()
      }
      if(e.keyCode == 38){
        e.preventDefault();
        ChordComponent.speedUpScroll()
      }
      if(e.keyCode == 32){
        e.preventDefault();
        ChordComponent.moveWindowUp();
      }
    })
  }

  showChord(chord){
    let popup = document.querySelector('.chord-popup');
    let images = document.querySelector('.chord-popup .images')
    this.popupSettings.current = 0;
    images.setAttribute("style",`left:0px`)
    popup.classList.add('show')
    this.getChordImages(chord.innerText); 
  }
  hideChord(){
    let popup = document.querySelector('.chord-popup')
    popup.classList.remove('show')
  }
  nextChord(){
    if(this.popupSettings.current < this.popupSettings.length -1){
      let images = document.querySelector('.chord-popup .images')
      this.popupSettings.current++
      images.setAttribute("style",`left:${this.popupSettings.current*-150}px`)
    }
  }
  previousChord(){
    if(this.popupSettings.current > 0){
      let images = document.querySelector('.chord-popup .images')
      this.popupSettings.current--
      images.setAttribute("style",`left:${this.popupSettings.current*-150}px`)
    }
  }


  traposeChordsUp(){
    let chordValue, newValue;
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach(e =>{
      let newValue;
      let root = e.querySelector('.rootNote')
      let sufix = e.querySelector('.sufix').innerText
      switch (root.innerText){
        case 'A': newValue = 'A#'; break;
        case 'A#': newValue = 'B'; break;
        case 'B': newValue = 'C'; break;
        case 'C': newValue = 'C#'; break;
        case 'C#': newValue = 'D'; break;
        case 'D': newValue = 'D#'; break;
        case 'D#': newValue = 'E'; break;
        case 'E': newValue = 'F'; break;
        case 'F': newValue = 'F#'; break;
        case 'F#': newValue = 'G'; break;
        case 'G': newValue = 'G#'; break;
        case 'G#': newValue = 'A'; break;
      }
      e.classList.remove(`${root.innerText}${sufix}`);
      e.classList.add(`${newValue}${sufix}`);
      root.innerText = newValue;
    })
  }
  traposeChordsDown(){
    let chordValue, newValue;
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach(e =>{
      let newValue;
      let root = e.querySelector('.rootNote')
      let sufix = e.querySelector('.sufix').innerText
      switch (root.innerText){
        case 'A': newValue = 'G#'; break;
        case 'A#': newValue = 'A'; break;
        case 'B': newValue = 'A#'; break;
        case 'C': newValue = 'B'; break;
        case 'C#': newValue = 'C'; break;
        case 'D': newValue = 'C#'; break;
        case 'D#': newValue = 'D'; break;
        case 'E': newValue = 'D#'; break;
        case 'F': newValue = 'E'; break;
        case 'F#': newValue = 'F'; break;
        case 'G': newValue = 'F#'; break;
        case 'G#': newValue = 'G'; break;
      }
      e.classList.remove(`${root.innerText}${sufix}`);
      e.classList.add(`${newValue}${sufix}`);
      root.innerText = newValue;
    })
  }

  scrollTo() {
    this.intervalID = setInterval(() => this.scrollInterval(), this.scrollConfig.interval);
  }

  scrollInterval(){
    document.documentElement.scrollTop += 1;
    if(window.innerHeight + window.scrollY > document.body.offsetHeight){
      clearInterval(this.intervalID);
    }
  }

  speedUpScroll(){
    clearInterval(this.intervalID);
    this.scrollConfig.interval--
    this.scrollTo();
  }

  speedDownScroll(){
    clearInterval(this.intervalID);
    this.scrollConfig.interval++
    this.scrollTo();
  }

  moveWindowUp(){
    document.documentElement.scrollTop -= 300;
  }

  isScrollAtBottom(){
    return window.innerHeight + window.scrollY < document.body.offsetHeight
  }

  stopScroll(){
    this.isScrollActivated = false;
  }

  getChordImages(note) {
    this.popupName = note;
    this.popupImages = [];
    this.elRef.nativeElement.querySelectorAll('.chord-popup .images')[0].classList.remove(`chordnumber${this.popupSettings.length}`)
    return this.ChordsImageService.getChordImages(note).subscribe(data => {
      if(data.length > 0){
        let imagesArr = data;
        imagesArr.forEach(e => {
          this.popupImages.push(e + '.gif');
        })
        this.popupSettings.length = imagesArr.length;
        this.elRef.nativeElement.querySelectorAll('.chord-popup .images')[0].classList.add(`chordnumber${this.popupSettings.length}`)
      }else{
        this.popupSettings.length = 1;
        this.elRef.nativeElement.querySelectorAll('.chord-popup .images')[0].classList.add(`chordnumber${this.popupSettings.length}`)
        this.popupImages.push('../../assets/img/placeholder.png')
      }
    });
  }
}
