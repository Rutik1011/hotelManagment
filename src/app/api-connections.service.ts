import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionsService {

  constructor(private http:HttpClient) { }      //put,get,post that all methods in this httpClint

//java api
url="http://localhost:8080"

getuser():Observable<any>{
  return this.http.get(`${this.url}/show`)
}

adduser(user:any):Observable<any>{                 //user , argument having data that filled in hyml file      
  return this.http.post(`${this.url}/add`,user)
}

addvalid(user:any):Observable<any>{
  return this.http.post(`${this.url}/addvalid`,user, {responseType: 'text'});  //responseType: 'text' is used to get response as text from api
} 

deletuser(id:any):Observable<any>{
  return this.http.delete(`${this.url}/delet/${id}`)
}
  
loginuser(data:any){
  return this.http.post(`${this.url}/login`,data);
}

loginByMono(data:any){
  return this.http.post(`${this.url}/loginByMono`,data);
}

 // 🔹 Update profile API call
  updateProfile(id: number, user: any): Observable<any> {
    // calling PUT http://localhost:8080/update/{id}
    return this.http.put(`${this.url}/update/${id}`, user);
  }

}