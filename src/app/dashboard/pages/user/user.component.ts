import { Component } from '@angular/core';
import { PostTimelineComponent } from "../post-timeline/post-timeline.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [PostTimelineComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  userId = 1;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }
}
