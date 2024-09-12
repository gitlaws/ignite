import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgniteLogoComponent } from './ignite-logo.component';

describe('IgniteLogoComponent', () => {
  let component: IgniteLogoComponent;
  let fixture: ComponentFixture<IgniteLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IgniteLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgniteLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
