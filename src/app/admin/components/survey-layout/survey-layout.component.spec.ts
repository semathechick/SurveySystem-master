import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyLayoutComponent } from './survey-layout.component';

describe('SurveyLayoutComponent', () => {
  let component: SurveyLayoutComponent;
  let fixture: ComponentFixture<SurveyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
