import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlayerMatch } from './player-match'

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private matchesUrl = 'api/matches';  

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  
    getMatches(id: string): Observable<PlayerMatch> {
      const url = `${this.matchesUrl}/${id}`;
      return this.http.get<PlayerMatch>(url).pipe(
        tap(_ => this.log(`fetched matches for player id=${id}}`)),
        catchError(this.handleError<PlayerMatch>(`getPlayer id=${id}}`))
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
