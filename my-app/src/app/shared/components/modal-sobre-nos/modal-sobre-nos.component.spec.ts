import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSobreNosComponent } from './modal-sobre-nos.component';

describe('ModalSobreNosComponent', () => {
  let component: ModalSobreNosComponent;
  let fixture: ComponentFixture<ModalSobreNosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSobreNosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSobreNosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
