import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuEstadosComponent } from './sidemenu-estados.component';

describe('SidemenuEstadosComponent', () => {
  let component: SidemenuEstadosComponent;
  let fixture: ComponentFixture<SidemenuEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
