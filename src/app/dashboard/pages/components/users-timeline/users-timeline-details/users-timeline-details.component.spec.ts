import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTimelineDetailsComponent } from './users-timeline-details.component';

describe('UsersTimelineDetailsComponent', () => {
  let component: UsersTimelineDetailsComponent;
  let fixture: ComponentFixture<UsersTimelineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTimelineDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTimelineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
