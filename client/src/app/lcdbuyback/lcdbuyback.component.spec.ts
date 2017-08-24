import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcdbuybackComponent } from './lcdbuyback.component';

describe('LcdbuybackComponent', () => {
  let component: LcdbuybackComponent;
  let fixture: ComponentFixture<LcdbuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcdbuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcdbuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
