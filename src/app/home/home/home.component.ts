import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nowHours = new Date().getHours();
  constructor() {}

  ngOnInit(): void {
    // console.log('test', new Date().getHours());
  }
}
