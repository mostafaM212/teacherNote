import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;

  constructor(private sideNavService: SideNavService) {}

  ngOnInit(): void {
    this.sideNavService.openSideNav$.subscribe((data) => {
      console.log('test', data);

      this.drawer?.toggle();
    });
  }
}
