import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuponsComponent } from './listar-cupons.component';

describe('ListarCuponsComponent', () => {
  let component: ListarCuponsComponent;
  let fixture: ComponentFixture<ListarCuponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCuponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCuponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
