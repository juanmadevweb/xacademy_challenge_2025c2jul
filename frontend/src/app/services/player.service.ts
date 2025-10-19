import { Injectable } from '@angular/core';
import Player from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players: Player[];
  private nextId: number = 2;
  constructor() {
    this.players = [
      {
        id: 1,
        first_name: 'Lio',
        last_name: 'Messi',
        position: 'CAM',
        club: 'Miami',
        nationality: 'Argentina'
      },
      {
        id: 2,
        first_name: 'Cris',
        last_name: 'Ronaldo',
        position: 'ST',
        club: 'ArabiaS',
        nationality: 'POR'
      },
    ]
   }

  getPlayerById(id: number): Player | undefined{
    return this.players.find(p => p.id === id);
  }

  deletePlayerByid(id: number): void{
    this.players = this.players.filter(player => player.id !== id);
    console.log(`Player with ID ${id} delete.`)
  }

  createPlayer(player: Player): void{
    player.id = this.nextId++;
    this.players.push(player);
  }

  updatePlayer(player:Player): void{
    const index = this.players.findIndex(p => p.id === player.id);

    if (index !== -1){
      this.players[index] = player;
    }
  }
}
