import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidCardComponent } from './aid-card.component';

describe('AidCardComponent', () => {
  let component: AidCardComponent;
  let fixture: ComponentFixture<AidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
