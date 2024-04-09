import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleViewPointComponent } from './multiple-view-point.component';

describe('MultipleViewPointComponent', () => {
  let component: MultipleViewPointComponent;
  let fixture: ComponentFixture<MultipleViewPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleViewPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleViewPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
