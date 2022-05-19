import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorycompComponent } from './categorycomp.component'

describe('CategorycompComponent', () => {
  let component: CategorycompComponent;
  let fixture: ComponentFixture<CategorycompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorycompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorycompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
