import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories = ['FASHION', 'EDUCATION', 'HOMEWARE'];

  status: string;

  constructor(private data: FilterService, public router: Router) { }

  ngOnInit() {
    this.data.currentStatus.subscribe(status => this.status = status);
  }

  newStatus(cat) {
    this.data.changeStatus(cat);
    this.router.navigate(['/']);
  }

}
