import { Injectable } from '@angular/core';
import { Search } from '../classes/search';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  search !: Search;


  constructor(private http: HttpClient) {
    this.search = new Search('',',','');
   }

   userRequest(){
     interface ApiResponse{
       name :string,
       national_id:string,
       date_of_birth:string
     }
     let promise = new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse>('https://api.github.com/users/Ephraim19')
        .toPromise()
        .then(
          (response: any) => {
            this.search.name = response.name;
            this.search.national_id = response.national_id;
            this.search.date_of_birth = response.date_of_birth;
            resolve(response);
          },
          (error) => {
            this.search.name = "Error occurred while fetching data"
            reject(error);
          }
        );
    });
   }
}
