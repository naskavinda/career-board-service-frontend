import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTimelineComponent } from './users-timeline.component';

describe('UsersTimelineComponent', () => {
  let component: UsersTimelineComponent;
  let fixture: ComponentFixture<UsersTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
