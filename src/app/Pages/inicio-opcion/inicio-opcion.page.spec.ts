import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioOpcionPage } from './inicio-opcion.page';

describe('InicioOpcionPage', () => {
  let component: InicioOpcionPage;
  let fixture: ComponentFixture<InicioOpcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioOpcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
