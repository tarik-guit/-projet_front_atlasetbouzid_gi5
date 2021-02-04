import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export  class facadeserv{
  elementcree:any=[];
  urlc1:string="http://localhost:8001";
  urlc2:string="http://localhost:8002";

  constructor(private  http:HttpClient) {
  }


  creerenregistrement(c){return this.http.post(this.urlc1+"/form_enr",c);}
  creerenregistrementforclient(c){return this.http.post(this.urlc2+"/form_enr",c);}

  }
