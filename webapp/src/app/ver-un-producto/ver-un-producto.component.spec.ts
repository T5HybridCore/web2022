import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUnProductoComponent } from './ver-un-producto.component';

describe('VerUnProductoComponent', () => {
  let component: VerUnProductoComponent;
  let fixture: ComponentFixture<VerUnProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUnProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUnProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
