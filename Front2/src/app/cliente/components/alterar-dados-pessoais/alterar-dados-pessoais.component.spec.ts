import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDadosPessoaisComponent } from './alterar-dados-pessoais.component';

describe('AlterarDadosPessoaisComponent', () => {
  let component: AlterarDadosPessoaisComponent;
  let fixture: ComponentFixture<AlterarDadosPessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarDadosPessoaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarDadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
