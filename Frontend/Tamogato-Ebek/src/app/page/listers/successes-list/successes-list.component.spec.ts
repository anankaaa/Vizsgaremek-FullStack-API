import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessesListComponent } from './successes-list.component';

describe('SuccessesListComponent', () => {
  let component: SuccessesListComponent;
  let fixture: ComponentFixture<SuccessesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
