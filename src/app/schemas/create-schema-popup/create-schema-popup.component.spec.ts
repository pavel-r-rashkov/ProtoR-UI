import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchemaPopupComponent } from './create-schema-popup.component';

describe('CreateSchemaPopupComponent', () => {
  let component: CreateSchemaPopupComponent;
  let fixture: ComponentFixture<CreateSchemaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchemaPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchemaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
