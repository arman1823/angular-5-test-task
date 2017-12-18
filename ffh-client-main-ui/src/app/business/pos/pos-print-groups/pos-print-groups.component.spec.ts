import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPrintGroupsComponent } from './pos-print-groups.component';

describe('PosPrintGroupsComponent', () => {
  let component: PosPrintGroupsComponent;
  let fixture: ComponentFixture<PosPrintGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosPrintGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPrintGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
