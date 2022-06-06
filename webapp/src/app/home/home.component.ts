import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // TEST
    this.apiService.getAllProducts().subscribe(result => {
      console.log(result);
    });
    
    this.apiService.getProduct('1PUUTLctDaLB15VauLT9').subscribe(result => {
      console.log(result);
    });
  }

}
