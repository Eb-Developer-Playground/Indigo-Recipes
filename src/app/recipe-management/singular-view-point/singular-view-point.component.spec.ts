import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularViewPointComponent } from './singular-view-point.component';

describe('SingularViewPointComponent', () => {
  let component: SingularViewPointComponent;
  let fixture: ComponentFixture<SingularViewPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingularViewPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingularViewPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
