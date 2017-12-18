import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPrintGroupEditDialogComponent } from './pos-print-group-edit-dialog.component';

describe('PosPrintGroupEditDialogComponent', () => {
  let component: PosPrintGroupEditDialogComponent;
  let fixture: ComponentFixture<PosPrintGroupEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosPrintGroupEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPrintGroupEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
