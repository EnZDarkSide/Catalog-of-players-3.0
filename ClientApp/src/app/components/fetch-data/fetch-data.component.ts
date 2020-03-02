import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/player';
import { PlayersService } from '../../services/players.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
})
export class FetchDataComponent {
  minDate: Date;
  maxDate: Date;

  // Необходим для фильтрации команд в появляющемся поле добавления команд
  teamsControl = new FormControl('', [Validators.required]);

  filteredTeams: Observable<string[]>;
  teams: string[] = [];

  countries = ['Россия', 'США', 'Италия'];
  sexes = ['Мужской', 'Женский', 'Другой'];

  dateOfBirth: Date;
  player: Player;
  submitted = false;

  public players: Player[];

  constructor(
    http: HttpClient,
    private _adapter: DateAdapter<any>,
    @Inject('BASE_URL') baseUrl: string,
    private playersService: PlayersService) {
      
    this._adapter.setLocale('ru');

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date();

    playersService.getTeams().then(
      result => (this.teams = result),
      error => console.log('Не удалось получить список команд')
    );

    this.playersService.getPlayers().then((data: Player[]) => {
      this.players = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.player) {
      this.playersService.editPlayerInDB(this.player);
    }
  }

  resetPlayer() {
    this.submitted = false;
    this.player = null;
  }

  selectPlayerToEdit(selectedPlayer: Player) {
    this.player = selectedPlayer;
  }

  resetEditing() {
    this.player = null;
  }
}
