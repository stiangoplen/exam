import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesPage } from './samples.page';

describe('SamplesPage', () => {
  let component: SamplesPage;
  let fixture: ComponentFixture<SamplesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
