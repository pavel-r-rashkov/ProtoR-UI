import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchemaPopupComponent } from './view-schema-popup.component';

describe('ViewSchemaPopupComponent', () => {
  let component: ViewSchemaPopupComponent;
  let fixture: ComponentFixture<ViewSchemaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSchemaPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchemaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
