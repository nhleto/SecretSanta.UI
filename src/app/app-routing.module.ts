import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Screens/home/home.component";
import { PageNotFoundComponent } from "./Components/page-not-found/page-not-found.component";
import {GroupCreationComponent} from "./Components/group-creation/group-creation.component";
import { GroupDisplayComponent } from "./Components/group-display/group-display.component";

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'group', component: GroupCreationComponent },
  { path: 'group/:groupId', component: GroupDisplayComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
