import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()


// tslint:disable-next-line:class-name
export  class servicelog  {

  constructor(private http:HttpClient) {
  }


  //logup(c){ return  this.http.post("http://localhost:8002/signup",c);}
}
