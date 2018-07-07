import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { ActivatedRoute } from '@angular/router';

import { DailyStatsComponent } from '../daily-stats/daily-stats.component'

import { PlayerService } from '../player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private playerService: PlayerService) { }

  private player: Player;

  getplayer(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    //spoof
    const id = "AKBBCN"
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  ngOnInit() {
    this.getplayer();
  }

}
