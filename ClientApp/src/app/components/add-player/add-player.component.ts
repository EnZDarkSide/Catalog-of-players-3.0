import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateAdapter } from '@angular/material/core';
import { map, startWith } from 'rxjs/operators';
import { Player } from '../../models/player';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css'],
})
export class AddPlayerComponent implements OnInit{
  minDate: Date;
  maxDate: Date;

  // Необходим для фильтрации команд в появляющемся поле добавления команд
  teamsControl = new FormControl('', [Validators.required]);

  filteredTeams: Observable<string[]>;
  teams: string[] = [];

  countries = ['Россия', 'США', 'Италия'];
  sexes = ['Мужской', 'Женский', 'Другой'];

  dateOfBirth: Date;
  player: Player = new Player();
  submitted = false;

  constructor(
    private _adapter: DateAdapter<any>,
    private httpClient: HttpClient,
    private playersService: PlayersService,
    @Inject('BASE_URL') baseUrl: string) {

    this._adapter.setLocale('ru');
    console.log(baseUrl);

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date();

    playersService.getTeams().then(result => this.teams = result,
      error => console.log('Не удалось получить список команд'));

  }

  onSubmit() {
    this.submitted = true;
    this.playersService.addPlayer(this.player);
  }

  newPlayer() {
    this.player = new Player();
  }

  ngOnInit() {
    this.filteredTeams = this.teamsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teams.filter(option => option.toLowerCase().includes(filterValue));
  }

}
