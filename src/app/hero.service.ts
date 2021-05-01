import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"

import { Hero } from "./hero"
import { HEROES } from "./mock-heroes"
//import { HeroesComponent } from './heroes/heroes.component';
import { MessageService } from "./message.service"
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes' //WebAPIのURL
  httpOptions = {
    headers: new HttpHeaders({'Content-type':'application/json'})
  }


  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }

  /*　http模擬（WebAPI）使用しない場合に使用
  getHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES)
    this.messageService.add("HeroService: feched heroes (get hero!)")
    return heroes
  }
  */

  getHeroes(): Observable<Hero[]>{
//  .add("HeroService: feched heroes (get hero!)")
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('feched heroes')),
      catchError(this.handleError<Hero[]>("get Heroes",[]))
    );
  }

  getHero(id:number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    //this.messageService.add(`Hero feched hero id = ${id}`);
    //return of(HEROES.find(hero => hero.id === id)!)//曖昧さ回避(!)
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`feched hero id=${id}`)),
      catchError(this.handleError<Hero>(`get Hero id=${id}`))
    )
  }

  private handleError<T>(operation="operation",result?:T){
    return (error: any):Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      
      console.error(error)
      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`)

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T)
    }
  }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`add hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    )
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    )
  }
}
