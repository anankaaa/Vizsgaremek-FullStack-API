import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidsListComponent } from './aids-list.component';

describe('AidsListComponent', () => {
  let component: AidsListComponent;
  let fixture: ComponentFixture<AidsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AidsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
