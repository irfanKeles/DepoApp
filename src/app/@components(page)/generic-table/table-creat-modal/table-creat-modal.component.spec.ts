import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreatModalComponent } from './table-creat-modal.component';

describe('TableCreatModalComponent', () => {
  let component: TableCreatModalComponent;
  let fixture: ComponentFixture<TableCreatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCreatModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCreatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
