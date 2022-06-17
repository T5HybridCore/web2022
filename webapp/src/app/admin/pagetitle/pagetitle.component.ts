import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnInit {
  
  // Parameters
  @Input() title = '';
  @Input() path = '';

  // Attributes
  pathArray: string[] = [];

  constructor() { }

  ngOnInit(): void {
    // Breadcrumb
    this.breadcrumb();
  }

  breadcrumb(): void {
    this.pathArray = this.path.split('/');
    this.pathArray = this.pathArray.slice(1, this.pathArray.length);    
  }
}
