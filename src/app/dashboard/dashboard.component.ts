import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import{Hero}from"../hero"
import{HeroService}from"../hero.service"
import{MessageService}from"../message.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes:Hero[] = []

  constructor(private heroService:HeroService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes():void{
    //this.messageService.add("Click from dash board");
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes=heroes.slice(1,5))
  }
}
