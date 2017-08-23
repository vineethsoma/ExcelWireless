import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesloadedComponent } from './imagesloaded.component';

describe('ImagesloadedComponent', () => {
  let component: ImagesloadedComponent;
  let fixture: ComponentFixture<ImagesloadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesloadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesloadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
