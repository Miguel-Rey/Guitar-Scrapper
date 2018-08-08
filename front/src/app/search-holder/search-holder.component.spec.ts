import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHolderComponent } from './search-holder.component';

describe('SearchHolderComponent', () => {
  let component: SearchHolderComponent;
  let fixture: ComponentFixture<SearchHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
