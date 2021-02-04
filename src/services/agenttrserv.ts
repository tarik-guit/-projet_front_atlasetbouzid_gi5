import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export  class agenttrserv{
  elementcree:any=[];
  urlc:string="http://localhost:8001";
  constructor(private  http:HttpClient) {
  }


  getenregistrements(){
    return this.http.get(this.urlc+"/form_enrs");}
  creeragent(c){return this.http.post(this.urlc+"/agent",c);}

  enregistrementtraité(p,c){return this.http.put(this.urlc+"/trait_form_enr/"+c.id,p);}

  getallagents(){return this.http.get(this.urlc+"/agents");}
  getagentsofcurrentuser(){return this.http.get(this.urlc+"/agents_currentadmin");}
  getenregistrementstraité(){return this.http.get(this.urlc+"/form_enrs_tr");}
  deleteenr(p){this.http.delete(this.urlc+"/form_enr/"+p.id).subscribe(data=>{console.log(data)})}

}
