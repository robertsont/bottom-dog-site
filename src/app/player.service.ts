import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Player } from './player'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl = 'api/players';  

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    getPlayers(): Observable<Player[]> {
      this.log('fetched Players');
      return this.http.get<Player[]>(this.playersUrl)
        .pipe(
          tap(Players => this.log(`fetched Players`)),
          catchError(this.handleError('getPlayers', []))
        );
    }
  
    getPlayer(id: string): Observable<Player> {
      const url = `${this.playersUrl}/${id}`;
      return this.http.get<Player>(url).pipe(
        tap(_ => this.log(`fetched player id=${id}}`)),
        catchError(this.handleError<Player>(`getPlayer id=${id}}`))
      );
    }
  
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    private log(message: string) {
      this.messageService.add('HeroService: ' + message);
    }
}
