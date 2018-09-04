import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysNotificationComponent } from './sys-notification.component';

describe('SysNotificationComponent', () => {
  let component: SysNotificationComponent;
  let fixture: ComponentFixture<SysNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
