import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  flag?: boolean;

  constructor(private api: ApiService) { }

  products: any[] = [];

  search(word: string) {

    console.log("search");
    this.flag = true;
    
    this.api.getProducts_by_name(word)
    .subscribe((data: any) => {
      
      console.log("search this api gets");
      this.products = data;
      console.log("this.products " + this.products);
      this.flag = false;

    });
  }

  ngOnInit(): void {
  }

}
