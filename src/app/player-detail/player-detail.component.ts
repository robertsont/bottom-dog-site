import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';
import { Match }  from '../match';
import { ActivatedRoute } from '@angular/router';

import { PlayerService } from '../player.service';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  @Input() player: Player;
  matches: Match[];

  constructor(private route: ActivatedRoute, 
    private playerService: PlayerService, 
    private matchService: MatchService) { }

  getplayer(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  getmatches(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.matchService.getMatches(id)
      .subscribe(matches => this.matches = matches.matches);
    console.log(this.matches)
  }

  ngOnInit() {
    this.getplayer();
    this.getmatches();
  }

}
