import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from "@angular/router";
import { CreatePlayerComponent } from '../../components/create-player/create-player.component';

@Component({
  selector: 'app-players',
  imports: [RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit{

  constructor(public playerS:PlayerService){

  }

  ngOnInit(): void {
    console.log('Player add:', this.playerS.players)
  }

  onDelete(playerId: number):void{
    if (confirm('Are you sure you want to remove this player?')) {
      this.playerS.deletePlayerByid(playerId);
    }
  }
}
