import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  // Parameters
  @Input() mode = 'single';
  
  constructor() { }

  ngOnInit(): void {
  }

}
