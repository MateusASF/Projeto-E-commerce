import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharPedidosComponent } from './acompanhar-pedidos.component';

describe('AcompanharPedidosComponent', () => {
  let component: AcompanharPedidosComponent;
  let fixture: ComponentFixture<AcompanharPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanharPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompanharPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
