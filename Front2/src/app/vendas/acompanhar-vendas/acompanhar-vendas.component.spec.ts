import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharVendasComponent } from './acompanhar-vendas.component';

describe('AcompanharVendasComponent', () => {
  let component: AcompanharVendasComponent;
  let fixture: ComponentFixture<AcompanharVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanharVendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompanharVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
