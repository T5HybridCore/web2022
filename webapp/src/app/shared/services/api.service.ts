import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
    console.log('Spotify Service is Ready');
  }

  getQuery(query: string) {
    const url = `http://localhost:5050/api/${query}`;
    //const headers = new HttpHeaders({'Authorization': 'Bearer BQCsMPBJkSfGFZto4sX8IeIT49O7wGKObLyspHjGW8UnE1nnjBqd9oUM2PpKTGyvKGznq9Fjav3JQkxma_M'});
    //return this.httpClient.get(url, {headers});
    return this.httpClient.get(url);
  }

  // Products
  getAllProducts() {
    return this.getQuery(`product`);    
  }

  getProduct(id: string) {
    return this.getQuery(`product/${id}`);    
  }

  addProduct() {
    //
  }
}
