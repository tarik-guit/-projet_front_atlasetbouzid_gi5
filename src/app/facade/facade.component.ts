import { Component, OnInit } from '@angular/core';
import {login} from "../../modeles/login";
import {form_enr} from "../../modeles/form_enr";
import {FileInformation} from "../../modeles/FileInformation";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {facadeserv} from "../../services/facadeserv";
import {AuthenticationService} from "../securityjwt/services/AuthenticationService";
import {AuthenticationService2} from "../securityjwt/services/AuthenticationService2";
import {clienttrserv} from "../../services/clienttrserv";

@Component({
  selector: 'app-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.css']
})
export class FacadeComponent implements OnInit {
  facade1:boolean = true;
  facade2:boolean = false;
  facade3:boolean = false;
  facade4:boolean = false;
  facade5:boolean = false;
  facade6:boolean = false;
  facade7:boolean = false;
  agent:login=new login();
  admin:login=new login();
  form_enr:form_enr=new form_enr();
  file:any=[];
  fileuri:any=[];
  fileInformation:any=[];
  elementcree:any=[];

  constructor(private httpClient:HttpClient,public facaserv:facadeserv,private auth:AuthenticationService,
              private auth2:AuthenticationService2,private clienttserv:clienttrserv) { }

  ngOnInit(): void {
  }
  tofacade1(){this.facade1=true;this.facade2=false;this.facade3=false;this.facade4=false;this.facade5=false;this.facade6=false;this.facade7=false;}
tofacade2(){this.facade2=true;this.facade1=false;this.facade3=false;this.facade4=false;this.facade5=false;this.facade6=false;}
tofacade3(){this.facade2=false;this.facade1=false;this.facade3=true;this.facade4=false;this.facade5=false;this.facade6=false;}
tofacade4(){this.facade2=false;this.facade1=false;this.facade3=false;this.facade4=true;this.facade5=false;this.facade6=false;}
  tofacade7(){this.facade2=false;this.facade1=false;this.facade3=false;this.facade7=true;this.facade5=false;this.facade6=false;this.facade4=false}

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileInformation = null;
    }
  }

  sendFile() {
    const file: FormData = new FormData();
    file.append(`file`, this.file, this.file.name );
    // Pas d'ajout d'header exposant le content-type, le framework le fait pour vous.
    this.httpClient.post(
      'http://localhost:8001/uploadFile',
      file
    ).subscribe(value => {
      this.fileuri=value;
      this.form_enr.urlcin=this.fileuri.fileDownloadUri;

    },err=>{this.facade6=true;})
  }

creerenre(){
    this.sendFile();
      this.facaserv.creerenregistrement(this.form_enr).subscribe(data=>{this.elementcree=data;this.facade5=true},
          err=>{this.facade6=true;});

  }


loginadmin(){this.auth2.login(this.admin.username,this.admin.password);}

loginagent(){this.auth.login(this.agent.username,this.agent.password);}


  creerenreforclient(){

    this.facaserv.creerenregistrementforclient(this.form_enr).subscribe(data=>{this.elementcree=data;this.facade5=true},
      err=>{this.facade6=true;});

  }

}
