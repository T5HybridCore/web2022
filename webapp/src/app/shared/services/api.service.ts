import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Attributes
  url = 'https://superduperstore2022.herokuapp.com/api/';

  constructor(private httpClient: HttpClient) {
    console.log('API Service is ready');
  }

  // Methods
  private get(endpoint: string) {
    //const headers = new HttpHeaders({'Authorization': 'Bearer BQCsMPBJkSfGFZto4sX8IeIT49O7wGKObLyspHjGW8UnE1nnjBqd9oUM2PpKTGyvKGznq9Fjav3JQkxma_M'});
    //return this.httpClient.get(url, {headers});
    return this.httpClient.get(`${this.url}${endpoint}`);
  }

  private post(endpoint: string, body: string) {
    var b = endpoint === 'product' ? this.productToJson(body) : endpoint === 'user' ? this.userToJson(body) : endpoint === 'cart' ? this.cartToJson(body) : body;
    return this.httpClient.post(`${this.url}${endpoint}`, b);
  }

  private put(endpoint: string, id: string, body: string) {
    var b = endpoint === 'product' ? this.productToJson(body) : endpoint === 'user' ? this.userToJson(body) : endpoint === 'cart' ? this.cartToJson(body) : endpoint === 'order' ? this.orderToJson(body) : body;
    return this.httpClient.put(`${this.url}${endpoint}/${id}`, b);
  }

  private delete(endpoint: string, id: string) {
    return this.httpClient.delete(`${this.url}${endpoint}/${id}`);
  }

  // Utils
  private cartToJson(cart: any) {
    return {
      'products': cart.products
    };
  }

  private productToJson(product: any): any {
    return {
      'title': product.title,
      'category': product.category,
      'subCategory': product.subCategory,
      'manufacturer': product.manufacturer,
      'contents': product.contents,
      'price': product.price,
      'stock': product.stock,
      'organic': product.organic,
      'description': product.description,
      'picture': product.picture
    };
  }

  private orderToJson(order: any): any {
    return {
      'id': order.id,
      'customer': order.customer,
      'date': order.date,
      'products': order.products,
      'status': parseInt(order.status)
    };
  }

  private userToJson(user: any): any {
    return {
      'email': user.email,
      ...(user.password) && { 'password': user.password },
      'displayName': user.displayName,
      'photoURL': user.photoURL,
      ...(user.phoneNumber) && { 'phoneNumber': '+52' + user.phoneNumber },
      'disabled': user.disabled === 'true'
    };
  }

  // Question
  sendQuestion(question: any) {
    return this.post(`question`, question);
  }


  // Cart
  getCart(uid: string) {
    return this.get(`cart/${uid}`);
  }

  addToCart(cart: any) {
    return this.put(`cart`, cart.id, cart);
  }

  // Customers
  getCustomers() {
    return this.get(`customer`);
  }

  getCustomer(uid: string) {
    return this.get(`customer/${uid}`);
  }

  addCustomer(customer: any) {
    return this.post('customer', customer);
  }

  updateCustomer(customer: any) {
    return this.put('customer', customer.uid, customer);
  }

  deleteCustomer(uid: any) {
    return this.delete('customer', uid);
  }

  // Orders
  getOrders() {
    return this.get(`order`);
  }

  getOrder(id: string) {
    return this.get(`order/${id}`);
  }

  addOrder(order: any) {
    return this.post('order', order);
  }

  updateOrder(order: any) {
    return this.put('order', order.id, order);
  }

  deleteOrder(id: any) {
    return this.delete('order', id);
  }

  // Products
  getProducts() {
    return this.get(`product`);
  }

  getProduct(id: string) {
    return this.get(`product/${id}`);
  }

  addProduct(product: any) {
    return this.post('product', product);
  }

  updateProduct(product: any) {
    return this.put('product', product.id, product);
  }

  deleteProduct(id: any) {
    return this.delete('product', id);
  }

  getProducts_by_name(search: string) {
    return this.get(`search?q=${search}&type=product`);
  }

  // Recipes
  getRecipes() {
    return this.get('recipe');
  }

  // Users
  getUsers() {
    return this.get(`user`);
  }

  getUser(id: string) {
    return this.get(`user/${id}`);
  }

  addUser(user: any) {
    return this.post('user', user);
  }

  updateUser(user: any) {
    return this.put('user', user.uid, user);
  }

  deleteUser(uid: any) {
    return this.delete('user', uid);
  }
}
