import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpandComponent } from './modal-expand.component';

describe('ModalExpandComponent', () => {
  let component: ModalExpandComponent;
  let fixture: ComponentFixture<ModalExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExpandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
