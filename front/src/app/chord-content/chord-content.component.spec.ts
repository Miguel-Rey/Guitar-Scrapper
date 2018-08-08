import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordContentComponent } from './chord-content.component';

describe('ChordContentComponent', () => {
  let component: ChordContentComponent;
  let fixture: ComponentFixture<ChordContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
