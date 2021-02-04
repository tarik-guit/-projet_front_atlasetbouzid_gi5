import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacadeComponent } from './facade/facade.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {facadeserv} from "../services/facadeserv";
import { AgenttrComponent } from './agenttr/agenttr.component';
import {agenttrserv} from "../services/agenttrserv";
import {JwPaginationComponent, JwPaginationModule} from "jw-angular-pagination";
import { ClienttrComponent } from './clienttr/clienttr.component';
import {AuthenticationService} from "./securityjwt/services/AuthenticationService";
import {AuthenticationService2} from "./securityjwt/services/AuthenticationService2";
import {ErrorInterceptor} from "./securityjwt/aide/ErrorInterceptor";
import {JwtInterceptor} from "./securityjwt/aide/JwtInterceptor";
import {clienttrserv} from "../services/clienttrserv";

@NgModule({
  declarations: [
    AppComponent,
    FacadeComponent,
    AgenttrComponent,
    ClienttrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwPaginationModule,

  ],
  providers: [clienttrserv,facadeserv,agenttrserv,AuthenticationService,AuthenticationService2,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
