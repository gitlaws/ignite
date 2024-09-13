import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneLogoComponent } from './drone-logo.component';

describe('DroneLogoComponent', () => {
  let component: DroneLogoComponent;
  let fixture: ComponentFixture<DroneLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DroneLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroneLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
