import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "http://localhost:8080/api/v1/customers";
  private emailEndpoint = "https://run.mocky.io/v3/c9ec2ca3-a7f5-41d0-8550-b859508f4948";
  constructor(private httpClient: HttpClient) { }

  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}`);
  }

  createCustomer(customer: Customer): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, customer);
  }

  getCustomerById(id: number): Observable<Customer>{
      return this.httpClient.get<Customer>(`${this.baseURL}/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  sendNotificationEmail(): Observable<any> {
    return this.httpClient.get(this.emailEndpoint);
  }

  // searchCustomers(query: string): Observable<Customer[]> {
  //   return this.httpClient.get<Customer[]>(`${this.baseURL}/search?query=${query}`);
  // }
}
