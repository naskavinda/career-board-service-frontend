import { Component } from '@angular/core';
import { UsersTimelineComponent } from "../components/users-timeline/users-timeline.component";

@Component({
  selector: 'app-admin',
  imports: [UsersTimelineComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
