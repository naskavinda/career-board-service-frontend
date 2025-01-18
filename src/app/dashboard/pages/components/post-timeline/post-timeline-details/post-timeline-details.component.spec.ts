import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTimelineDetailsComponent } from './post-timeline-details.component';

describe('PostTimelineDetailsComponent', () => {
  let component: PostTimelineDetailsComponent;
  let fixture: ComponentFixture<PostTimelineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTimelineDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTimelineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
