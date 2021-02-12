import { Component, OnInit } from '@angular/core';
import {agenttrserv} from "../../services/agenttrserv";
import {agent} from "../../modeles/agent";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../securityjwt/services/AuthenticationService";
import {AuthenticationService2} from "../securityjwt/services/AuthenticationService2";
import {clienttrserv} from "../../services/clienttrserv";
import {MyConstants} from "../../modeles/MyConstants";

@Component({
  selector: 'app-agenttr',
  templateUrl: './agenttr.component.html',
  styleUrls: ['./agenttr.component.css']
})
export class AgenttrComponent implements OnInit {
  myconstants:MyConstants=new MyConstants();
  agentcreated:boolean=false;
  listeallagent:boolean=false;
  listagentcuurentadmin:boolean=false;
  editerenr:boolean=false;
  listeenr:boolean=false;
  listeagent:boolean=true;
  enregistrments:any=[];
  currentenr:any=[];
  currentagent:any=[];
  agent:agent=new agent();
  elementcree:any=[];
  image:any=[];
  listeagents:any=[];
  editeragent:boolean=false;
  pageofenregistrements:any=[];
  pageofagents:any=[];
  emailsend:boolean=false;
  trainotrai:boolean=false;
  creeragentt:boolean=true;
  file:any=[];
  fileuri:any=[];
  fileInformation:any=[];
  constructor(private agentrserv:agenttrserv,private http:HttpClient,private auth:AuthenticationService,
              private auth2:AuthenticationService2,private clienttserv:clienttrserv,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getenrengistrements();
  }

  getenrengistrements(){
    this.agentrserv.getenregistrements().subscribe(data=>{this.enregistrments=data;},err=>{})
  }

  getenrengistrementstraite(){
    this.agentrserv.getenregistrementstraité().subscribe(data=>{this.enregistrments=data;},err=>{})
  }

  toeditenr(p){this.editerenr=true;this.listeenr=false;this.currentenr=p;
     this.agent.email=this.currentenr.email;
     this.agent.nom=this.currentenr.nom;
    this.agent.prenom=this.currentenr.prenom;
    this.agent.tel=this.currentenr.tel;
    this.agent.numcin=this.currentenr.numcin;
    this.agent.urlcin=this.currentenr.urlcin;
   // this.getimage();
  }
  tolistenr(){this.listeenr=true;this.editerenr=false;this.agentcreated=false;
    this.agent.email=this.currentenr.email;}

  retour3(){this.creeragentt=false;this.listeenr=false;this.editerenr=true;this.agentcreated=false;
    }

  tocreateagent(){this.creeragentt=true;this.listeenr=false;this.editerenr=false;this.agent.urlcin=this.currentenr.urlcin;}
  /*getimage(){
    // @ts-ignore
    this.http.get(this.agent.urlcin).subscribe(data=>{this.image=data; console.log(data)})}
*/
  creeragent(){
    if(window.confirm("Vouler vous vraiment creer cet agent")){
      // @ts-ignore
      this.agent.remarque=document.getElementById('exampleFormControlTextarea1').value;
    this.agentrserv.creeragent(this.agent).subscribe(data=>{this.elementcree=data;this.agentcreated=true},err=>{})
  this.enregistrementtraite(this.currentenr);
  }}

enregistrementtraite(p){this.agentrserv.enregistrementtraité(null,p).subscribe(data=>{this.elementcree=data;})}


traited(){this.enregistrementtraite(this.currentenr);
  this.enregistrments.splice(this.enregistrments.indexOf(this.currentenr),1);
  this.pageofenregistrements.splice(this.pageofenregistrements.indexOf(this.currentenr),1);this.tolistenr();}

  getallagents(){this.agentrserv.getallagents().subscribe(data=>{this.listeagents=data;});this.listeallagent=true;this.listagentcuurentadmin=false;}
  getagentsofcurrentuser(){this.agentrserv.getagentsofcurrentuser().subscribe(data=>{this.listeagents=data;});this.listagentcuurentadmin=true;this.listeallagent=false;}

  toeditagent(p){;this.currentagent=p;this.editeragent=true;this.listeagent=false

  }

  deleteagent(){if(window.confirm("Voulez vous vraiment supprimer cet agent")){
    this.http.delete("http://localhost:8001/deleteagent/"+this.currentagent.tel).subscribe(data=>{
      this.elementcree=data})
  this.agentcreated=true;
  this.listeagents.splice(this.listeagents.indexOf(this.currentagent),1);
    this.pageofagents.splice(this.pageofagents.indexOf(this.currentagent),1);
    this.tolisteagent();
  }}

  tolisteagent(){this.listeagent=true;this.editeragent=false;this.agentcreated=false;this.emailsend=false}


  onChangePagea(page: Array<any>) {
    // update current page of items
    this.pageofagents=page ;

  }

  onChangePagee(page: Array<any>) {
    // update current page of items
    this.pageofenregistrements=page ;

  }
  logout(){this.auth2.logout()}

  envoyeremail(){
    this.myconstants.FRIEND_EMAIL=this.currentagent.email;
    this.myconstants.SUBJECT_EMAIL="Ensa Pay (Email de la part de ton agent)";
    // @ts-ignore
    this.myconstants.TEXT_EMAIL=document.getElementById('exampleFormControlTextare').value;
    this.clienttserv.envoyeremailagent(this.myconstants).subscribe(data=>{this.elementcree=data;},error => {this.elementcree="email peut etre envoyé mais y a erreur"});
    this.emailsend=true;}

     traitnontrait(){if(this.trainotrai){this.trainotrai=false;this.getenrengistrementstraite();}else{this.trainotrai=true;this.getenrengistrements()}}

  deleteenr(p){if(window.confirm("Voulez vous supprimer cet demande")){this.agentrserv.deleteenr(p);
    this.enregistrments.splice(this.enregistrments.indexOf(p),1);this.pageofenregistrements.splice(this.pageofenregistrements.indexOf(p),1);

  }}


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
      this.agent.urlcin=this.fileuri.fileDownloadUri;

    },err=>{})
  }
}
