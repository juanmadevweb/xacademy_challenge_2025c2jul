import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'; // ⬅️ Importamos Router
import { PlayerService } from '../../services/player.service';
import Player from '../../interfaces/player';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-create-player',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css'
})
export class CreatePlayerComponent implements OnInit{
  player: Player | null | undefined = undefined;
  playerId: number | null = null;

  formTitle: string = 'New Player';

  playerForm: FormGroup;
  first_name: FormControl;
  last_name: FormControl;
  position: FormControl;
  club: FormControl;
  nationality: FormControl;

  // ⬅️ Inyectamos Router para poder redirigir al usuario después de guardar
  constructor(public playerS:PlayerService, public route:ActivatedRoute, private router: Router){
    this.first_name = new FormControl('');
    this.last_name = new FormControl('');
    this.position = new FormControl('');
    this.club = new FormControl('');
    this.nationality = new FormControl('');
    this.playerForm = new FormGroup ( {
      first_nameP : this.first_name,
      last_nameP : this.last_name,
      positionP: this.position,
      clubP : this.club,
      nationalityP : this.nationality
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if(idParam){
        this.playerId = +idParam;

        this.player = this.playerS.getPlayerById(this.playerId);

        if (this.player){
          this.formTitle = `Player edit: ${this.player.first_name} ${this.player.last_name}`;
          
          // ⬅️ NECESARIO: Rellenar el formulario con los datos del jugador para editar
          this.playerForm.patchValue({
            first_nameP: this.player.first_name,
            last_nameP: this.player.last_name,
            positionP: this.player.position,
            clubP: this.player.club,
            nationalityP: this.player.nationality
          });

        } else{
          // Lógica de jugador nuevo
          this.formTitle = 'Create new Player';
        }
      } else {
        // Asegurarse de que el formulario esté limpio si no hay ID
        this.formTitle = 'Create new Player';
        this.playerId = null;
      }
    });
  }

  // ⬅️ MÉTODO NUEVO: La lógica que el botón llama con (ngSubmit)
  savePlayer(){
    // Verificamos que el formulario sea válido antes de intentar guardar
    if (this.playerForm.invalid) {
      console.error('Formulario no válido');
      return;
    }

    // 1. Mapear los valores del formulario a la interfaz Player
    const playerData = this.playerForm.value;
    const playerToSave: Player = {
      id: this.playerId || 0, // Usamos el ID existente o 0 para un nuevo jugador
      first_name: playerData.first_nameP,
      last_name: playerData.last_nameP,
      position: playerData.positionP,
      club: playerData.clubP,
      nationality: playerData.nationalityP
    };


    if (this.playerId) {
      // 2. Si hay ID, es una ACTUALIZACIÓN
      this.playerS.updatePlayer(playerToSave);
    } else {
      // 3. Si NO hay ID, es una CREACIÓN
      this.playerS.createPlayer(playerToSave);
    }

    // 4. Redirigir al usuario a la lista de jugadores (asumiendo que es la ruta '/players')
    this.router.navigate(['/players']); 
  }
}