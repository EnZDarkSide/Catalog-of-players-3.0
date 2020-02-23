import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateAdapter } from '@angular/material/core';
import {map, startWith} from 'rxjs/operators';
import { Player } from '../../models/player';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css'],
})
export class AddPlayerComponent implements OnInit{
  minDate: Date;
  maxDate: Date;

  teamsControl = new FormControl('', [Validators.required]);

  filteredTeams: Observable<string[]>;
  teams: string[] = [];

  countries = ['Россия', 'США', 'Италия'];
  genders = ['Мужской', 'Женский', 'Другой'];

  dateOfBirth: Date;
  player: Player = new Player();
  submitted = false;
  addNewTeam = false;


  constructor(
    private _adapter: DateAdapter<any>,
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {

    console.log(baseUrl);
    httpClient.get<string[]>(baseUrl + 'Players/getTeams').subscribe(result => {
      this.teams = result;
    }, error => console.error('Не удалось получить список комманд'));

    this._adapter.setLocale('ru');

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date();
  }

  onSubmit() {
    this.submitted = true;
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
