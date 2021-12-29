import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvaliacaoComponent } from './modal-avaliacao.component';

describe('ModalAvaliacaoComponent', () => {
  let component: ModalAvaliacaoComponent;
  let fixture: ComponentFixture<ModalAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAvaliacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
