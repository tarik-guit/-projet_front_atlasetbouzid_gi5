import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FacadeComponent} from "./facade/facade.component";
import {AgenttrComponent} from "./agenttr/agenttr.component";
import {ClienttrComponent} from "./clienttr/clienttr.component";
import {AuthGuard} from "./securityjwt/aide/AuthGuard";
import {AuthGuard2} from "./securityjwt/aide/AuthGuard2";


const routes: Routes = [{path:'facade' ,component:FacadeComponent  },
  {path:'agenttr' ,component:AgenttrComponent ,canActivate: [AuthGuard2] },
  {path:'clienttr' ,component:ClienttrComponent,canActivate: [AuthGuard]  },
  {path:'' ,component:AgenttrComponent ,canActivate: [AuthGuard2]},
  {path:'' ,component:ClienttrComponent ,canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
