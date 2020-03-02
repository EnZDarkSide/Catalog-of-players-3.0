import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PlayersService{
  
    API_URL = 'https://localhost:44319/';

    constructor(private httpClient: HttpClient) {
    }

    public getTeams(): Promise<string[]> {
        console.log(this.API_URL);
        return this.httpClient.get<string[]>(this.API_URL + 'Players/getTeams').toPromise();
    }

    public getPlayers(): Promise<Player[]> {
        return this.httpClient.get<Player[]>(this.API_URL + 'Players/getPlayers').toPromise();
    }

    public addPlayer(player: Player): string {
        this.httpClient.post(this.API_URL + 'Players/addPlayer', player).subscribe();
    }

    public editPlayerInDB(playerToEdit: Player): string {
        this.httpClient.post(this.API_URL + 'Players/editPlayer', playerToEdit).subscribe();
    }
}