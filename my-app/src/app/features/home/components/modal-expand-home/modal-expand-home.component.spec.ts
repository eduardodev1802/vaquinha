import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpandHomeComponent } from './modal-expand-home.component';

describe('ModalExpandHomeComponent', () => {
  let component: ModalExpandHomeComponent;
  let fixture: ComponentFixture<ModalExpandHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExpandHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExpandHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
