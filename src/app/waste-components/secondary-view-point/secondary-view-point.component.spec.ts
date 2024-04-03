import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryViewPointComponent } from './secondary-view-point.component';

describe('SecondaryViewPointComponent', () => {
  let component: SecondaryViewPointComponent;
  let fixture: ComponentFixture<SecondaryViewPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryViewPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondaryViewPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
