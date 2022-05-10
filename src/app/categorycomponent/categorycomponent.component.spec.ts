import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorycomponentComponent } from './categorycomponent.component';

describe('CategorycomponentComponent', () => {
  let component: CategorycomponentComponent;
  let fixture: ComponentFixture<CategorycomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorycomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorycomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
