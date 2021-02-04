import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class clienttrserv{
  urlc:string="http://localhost:8002";
  urlc2:string="http://localhost:8001";
  constructor(private  http:HttpClient) {

  }
  verifierauth(){ this.http.get(this.urlc+"/verifiauth").subscribe(data=>{console.log(data)})}

  creerclient(c){return this.http.post(this.urlc+"/client",c);}

  getallclients(){ return this.http.get(this.urlc+"/clients");}
  getallclientsforcurrentuser(){ return this.http.get(this.urlc+"/myclients");}

  supprimerclient(p){ this.http.delete(this.urlc+"/deleteclient/"+p.tel).subscribe(data=>{console.log(data)})}

  envoyeremail(c){return this.http.post(this.urlc+"/sendSimpleEmail",c);}
  envoyeremailagent(c){return this.http.post(this.urlc2+"/sendSimpleEmail",c);}

  creercompteforclient(p,c){return this.http.post(this.urlc+"/compte_client/"+p.id,c);}
  recupercomptesforclient(c){return this.http.get(this.urlc+"/comptes/"+c.id);}
  supprimercompteforclient(c){return this.http.delete(this.urlc+"/compte/"+c.id);}

  modifierpassword(c){return this.http.put(this.urlc+"/modifierpassword",c);}

  getenregistrements(){return this.http.get(this.urlc+"/form_enrs");}

  enregistrementtraité(p,c){return this.http.put(this.urlc+"/trait_form_enr/"+c.id,p);}

  getenregistrementstraité(){return this.http.get(this.urlc+"/form_enrs_tr");}


  deleteenr(p){this.http.delete(this.urlc+"/form_enr/"+p.id).subscribe(data=>{console.log(data)})}

}
