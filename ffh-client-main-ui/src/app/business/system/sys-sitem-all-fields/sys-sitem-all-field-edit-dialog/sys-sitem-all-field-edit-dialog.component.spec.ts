import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSitemAllFieldEditDialogComponent } from './sys-sitem-all-field-edit-dialog.component';

describe('SysSitemAllFieldEditDialogComponent', () => {
  let component: SysSitemAllFieldEditDialogComponent;
  let fixture: ComponentFixture<SysSitemAllFieldEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysSitemAllFieldEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSitemAllFieldEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
