import { Component, OnInit } from '@angular/core';
import { Search } from '../classes/search';
import { SearchService } from '../services/search.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search !: Search[];


  constructor( private searchService: SearchService, private http: HttpClient ) {
    this.search = [new Search("","","")];
   }
   searchPatient(){
    interface ApiResponse{
      name :string,
      national_id:string,
      date_of_birth:string
    }
    let promise = new Promise((resolve, reject) => {
     this.http
       .get<ApiResponse>('https://hospital-access.herokuapp.com/treatment')
       .toPromise()
       .then(
         (response: any) => {
          for (let i = 0; i < response.length; i++) {
           this.search[i].name = response.name;
           this.search[i].national_id = response.national_id;
           this.search[i].date_of_birth = response.date_of_birth;
           console.log(this.search[i]);
              this.search.push(
                new Search(
                  this.search[i].name,
                  this.search[i].national_id,
                  this.search[i].date_of_birth
                )
              );
          }
           
           resolve(response);
         },
         (error) => {
           console.log("error occured")
           reject(error);
         }
       );
   });
   }
  ngOnInit(): void {
    this.searchService.userRequest();
    this.search = [this.searchService.search];
  }

}
