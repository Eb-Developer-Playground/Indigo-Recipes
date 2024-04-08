import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSingularRecipeComponent } from './manage-singular-recipe.component';

describe('ManageSingularRecipeComponent', () => {
  let component: ManageSingularRecipeComponent;
  let fixture: ComponentFixture<ManageSingularRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSingularRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSingularRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
