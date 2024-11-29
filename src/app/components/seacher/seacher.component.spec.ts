import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeacherComponent } from './seacher.component';

describe('SeacherComponent', () => {
  let component: SeacherComponent;
  let fixture: ComponentFixture<SeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeacherComponent]
    });
    fixture = TestBed.createComponent(SeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
