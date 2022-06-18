import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  flag?: boolean;
  flag_loading?: boolean;

  @Output() messageEvent = new EventEmitter<string>();
  message: string = "yes"

  constructor(private api: ApiService) {}

  products: any[] = [];

  search(word: string) {
    console.log('search');
    this.flag_loading = true;


    
    if(word !=""){
      this.api.getProducts_by_name(word).subscribe((data: any) => {
        console.log('search this api gets');
        this.products = data;
        console.log('this.products ' + this.products);
        this.flag = false;
        this.flag_loading=false;
        this.message="yes";
        this.messageEvent.emit(this.message);
      });

    }else{
      this.message="no";
      this.messageEvent.emit(this.message);
      this.flag = true;
      this.flag_loading=false;
    }
    
  }

  ngOnInit(): void {}
}
