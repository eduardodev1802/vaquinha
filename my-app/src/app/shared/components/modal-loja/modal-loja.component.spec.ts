import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLojaComponent } from './modal-loja.component';

describe('ModalLojaComponent', () => {
  let component: ModalLojaComponent;
  let fixture: ComponentFixture<ModalLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
