import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from "../hero.service"

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  heroes:Hero[] = []; //空ヒーロー配列の定義
//  hero :Hero = {id:1,name:'Wind'}
  
  ngOnInit(): void {
    this.getHeroes();
  }

  selectedHero?: Hero;

  onSelect (hero: Hero): void{
      this.selectedHero=hero;
  }

  getHeroes(): void {
  //  this.heroes = this.heroService.getHeroes();  
  this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

}

/* htmlの残り
<!-
<h3>{{hero.name | uppercase}} Details</h3>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>

<div>
    <label for="name">Hero name : </label>
    <input id="name" [(ngModel)]="hero.name" placeholder="name">
</div>
->
*/