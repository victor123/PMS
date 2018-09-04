import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsdsComponent } from './psds.component';

describe('PsdsComponent', () => {
  let component: PsdsComponent;
  let fixture: ComponentFixture<PsdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
