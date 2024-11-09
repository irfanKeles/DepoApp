import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreatProducModalComponent } from './table-creat-produc-modal.component';

describe('TableCreatProducModalComponent', () => {
  let component: TableCreatProducModalComponent;
  let fixture: ComponentFixture<TableCreatProducModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCreatProducModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCreatProducModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
