import { Component, OnInit } from '@angular/core';
import {client} from "../../modeles/client";
import {AuthenticationService} from "../securityjwt/services/AuthenticationService";
import {AuthenticationService2} from "../securityjwt/services/AuthenticationService2";
import {clienttrserv} from "../../services/clienttrserv";
import {MyConstants} from "../../modeles/MyConstants";
import {compte} from "../../modeles/compte";
import {useraide} from "../../modeles/useraide";

@Component({
  selector: 'app-clienttr',
  templateUrl: './clienttr.component.html',
  styleUrls: ['./clienttr.component.css']
})
export class ClienttrComponent implements OnInit {
  myconstants:MyConstants=new MyConstants();
  elementcree:any=[];
  clientt:client=new client();
  listeclients:any=[];
  pageofclients:any=[];
  comptecreated:boolean=false;
  clientcreated:boolean=false;
  emailsend:boolean=false;
  listeallclients:boolean=false;
  listeclientsforcurrentuser:boolean=false;
  editclient:boolean=false;
  comptes:boolean=false;
  which:boolean=false;
  newpassword:boolean=false;
  passwordmodified:boolean=false;
  currentclient:any=[];
  listecomptes:any=[];
  pageofcompte:Array<any>;
  currentcompte:any=[];
  enregistrments:any=[];
  useraidee:useraide=new useraide();
  pageofenregistrements:any=[];
  editerenr:boolean=false;
  listeenr:boolean=true;
  trainotrai:boolean=true;
  currentenr:any=[];
  creerclientt:boolean=false;


  compt:compte=new compte();
  constructor(private auth:AuthenticationService,
              private auth2:AuthenticationService2,private clienttserv:clienttrserv) { }

  ngOnInit(): void { this.clienttserv.verifierauth();this.getenrengistrements();
  }


  onChangePagea(page: Array<any>) {
    // update current page of items
    this.pageofclients=page ;

  }
  onChangePagec(page: Array<any>) {
    // update current page of items
    this.pageofcompte=page ;


  }
  getclientssofcurrentuser(){this.clienttserv.getallclientsforcurrentuser().subscribe(data=>{this.listeclients=data});this.listeclientsforcurrentuser=true;this.listeallclients=false;this.which=false}
  getallaclients(){this.clienttserv.getallclients().subscribe(data=>{this.listeclients=data});this.listeclientsforcurrentuser=false;this.listeallclients=true;this.which=true;}

  logout(){this.auth.logout()}

  creerclient(){

    if(window.confirm("Vouler vous vraiment creer cet client")){
    // @ts-ignore
      this.clientt.remarque=document.getElementById('exampleFormControlTextarea1').value;
    this.clienttserv.creerclient(this.clientt).subscribe(data=>{this.elementcree.id="un client est crée" ,this.clientcreated=true},error=>{this.elementcree.id="not created",this.clientcreated=true})
    this.enregistrementtraite(this.currentenr)}}

  editerclient(c){this.currentclient=c;this.editclient=true;this.listeclientsforcurrentuser=false;this.listeallclients=false;}
  retour(){this.editclient=false;if(!this.which){this.listeclientsforcurrentuser=true;}else{this.listeallclients=true};this.clientcreated=false;this.emailsend=false}
  supprimerclient(){if(window.confirm("Voulez vous vraiment supprimer")){this.clienttserv.supprimerclient(this.currentclient);
    this.listeclients.splice(this.listeclients.indexOf(this.currentclient),1);this.pageofclients.splice(this.pageofclients.indexOf(this.currentclient),1);
  this.retour();
  }}

  envoyeremail(){
    this.myconstants.FRIEND_EMAIL=this.currentclient.email;
    this.myconstants.SUBJECT_EMAIL="Ensa Pay (Email de la part de ton agent)";
    // @ts-ignore
    this.myconstants.TEXT_EMAIL=document.getElementById('exampleFormControlTextare').value;
    this.clienttserv.envoyeremail(this.myconstants).subscribe(data=>{this.elementcree=data;},error =>{this.elementcree="email peut etre envoyé mais il y erreur"} );this.emailsend=true;}


    creercompteforcurrentclient(){if(window.confirm("Voulez vous créer compte")){this.clienttserv.creercompteforclient(this.currentclient,this.compt).subscribe(data=>{this.elementcree=data;this.listecomptes.push(data);this.pageofcompte.push(data);}),this.comptecreated=true;}}

    getcomptesforcurrentclient(){this.clienttserv.recupercomptesforclient(this.currentclient).subscribe(data=>{this.listecomptes=data})}

    supprimercompteforcurrentclient(p){if(window.confirm("Voulez vous vraiment supprimer")){this.clienttserv.supprimercompteforclient(p).subscribe(data=>{this.elementcree=data;
    })
      this.listecomptes.splice(this.listecomptes.indexOf(p),1);this.pageofcompte.splice(this.pageofcompte.indexOf(p),1);
  }}

     editercompte(p){this.currentcompte=p;this.comptes=true;}

     accedercomptes(){this.comptes=true;this.editclient=false;this.listeallclients=false;this.listeclientsforcurrentuser=false;this.getcomptesforcurrentclient();}

    retour2(){this.comptes=false;this.editclient=true;this.listeallclients=false;this.listeclientsforcurrentuser=false;this.comptecreated=false;}

    tochangepassword(){if(this.newpassword){this.newpassword=false}else{this.newpassword=true};this.passwordmodified=false;}

    modifierpassword(){this.clienttserv.modifierpassword(this.useraidee).subscribe(data=>{this.elementcree=data;console.log(data)});this.passwordmodified=true;}

  onChangePagee(page: Array<any>) {
    // update current page of items
    this.pageofenregistrements=page ;

  }

  getenrengistrements(){
    this.clienttserv.getenregistrements().subscribe(data=>{this.enregistrments=data;},err=>{})
  }

  getenrengistrementstraite(){
    this.clienttserv.getenregistrementstraité().subscribe(data=>{this.enregistrments=data;},err=>{})
  }

  traitnontrait(){if(this.trainotrai){this.trainotrai=false;this.getenrengistrementstraite();}else{this.trainotrai=true;this.getenrengistrements()}}


  traited(){this.enregistrementtraite(this.currentenr);
    this.enregistrments.splice(this.enregistrments.indexOf(this.currentenr),1);
    this.pageofenregistrements.splice(this.pageofenregistrements.indexOf(this.currentenr),1);this.tolistenr();}

  enregistrementtraite(p){this.clienttserv.enregistrementtraité(null,p).subscribe(data=>{this.elementcree=data;})}

  tolistenr(){this.listeenr=true;this.editerenr=false;
    }

    editerrenr(p){this.editerenr=true;this.listeenr=false;this.currentenr=p;}

    tocreat(){this.creerclientt=true;this.editerenr=false;this.listeenr=false;
            this.clientt.numcin=this.currentenr.numcin;
      this.clientt.email=this.currentenr.email;
      this.clientt.nom=this.currentenr.nom;
      this.clientt.prenom=this.currentenr.prenom;
      this.clientt.tel=this.currentenr.tel;
    }

    retour3(){this.creerclientt=false;this.editerenr=true;this.listeenr=false;}

    deleteenr(p){if(window.confirm("Voulez vous créer compte")){this.clienttserv.deleteenr(p);
      this.enregistrments.splice(this.enregistrments.indexOf(p),1);this.pageofenregistrements.splice(this.pageofenregistrements.indexOf(p),1);

    }}
}
