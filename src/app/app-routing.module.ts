import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EvaluationToolComponent } from './evaluation-tool/evaluation-tool.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminGuardService as AdminGuard } from './services/admin-guard.service';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'evaluation',
    component: EvaluationToolComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', component: EvaluationToolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
