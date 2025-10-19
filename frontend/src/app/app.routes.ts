import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'players', component: PlayersComponent},
    {path: 'players/create', component:CreatePlayerComponent},
    {path: 'players/:id', component: CreatePlayerComponent}
];
