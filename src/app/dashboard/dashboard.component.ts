import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Match } from '../match';
import { ActivatedRoute } from '@angular/router';

import { DailyStatsComponent } from '../daily-stats/daily-stats.component'

import { PlayerService } from '../player.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private playerService: PlayerService) { }

  player: Player;
  matches: Match[];
  nemesis: String;
  randomMatches: Match[];
  displayedColumns = ['date', 'opponent', 'result', 'score'];

  getplayer(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    //spoof
    const id = "AKRORFS"
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  getdata(times): void {
    //const id = this.route.snapshot.paramMap.get('id');
    //spoof
    const id = "AKRORFS";
    let randomMatches: Match[] = new Array(times);
    this.playerService.getMatches(id)
      .subscribe(data => {
        this.matches = data.matches;
        this.nemesis = data.nemesis;
        for (let i = 0; i < times; i++) {
          var j = Math.floor((Math.random() * data.matches.length) + 1)
          console.log(j)
          randomMatches[i] = data.matches[j];
        }
        this.randomMatches = randomMatches;
      });   
  }

  ngOnInit() {
    this.getplayer();
    this.getdata(10);
  }

}
