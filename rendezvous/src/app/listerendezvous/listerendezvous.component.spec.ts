import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerendezvousComponent } from './listerendezvous.component';

describe('ListerendezvousComponent', () => {
  let component: ListerendezvousComponent;
  let fixture: ComponentFixture<ListerendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerendezvousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
