import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'message', component: MessageFormComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupFormComponent },
  { path: 'messageHistory', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }