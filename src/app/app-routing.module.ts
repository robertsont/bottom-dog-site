import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: PlayerDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
