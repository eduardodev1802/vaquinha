import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuicoesComponent } from './contribuicoes.component';

describe('ContribuicoesComponent', () => {
  let component: ContribuicoesComponent;
  let fixture: ComponentFixture<ContribuicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuicoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
