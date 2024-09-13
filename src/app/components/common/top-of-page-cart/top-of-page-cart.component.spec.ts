import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOfPageCartComponent } from './top-of-page-cart.component';

describe('TopOfPageCartComponent', () => {
  let component: TopOfPageCartComponent;
  let fixture: ComponentFixture<TopOfPageCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopOfPageCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopOfPageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
