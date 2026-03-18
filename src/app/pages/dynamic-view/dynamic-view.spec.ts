import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicViewComponent } from './dynamic-view';

describe('DynamicView', () => {
  let component: DynamicViewComponent;
  let fixture: ComponentFixture<DynamicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
