import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRulesComponent } from './test-rules.component';

describe('TestRulesComponent', () => {
  let component: TestRulesComponent;
  let fixture: ComponentFixture<TestRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
