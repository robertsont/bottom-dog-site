import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';
import { Match } from '../match';
import { DataType } from '../data-type';
import { ActivatedRoute } from '@angular/router';

import { PlayerService } from '../player.service';
import { MatchService } from '../match.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  @Input() player: Player;
  matches: Match[];
  displayedColumns = ['date', 'opponent', 'opponentGrade', 'score', 'result'];

  radius = 10;

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
      .subscribe(matches => { this.matches = matches.matches; this.drawChart(this.matches) });
    console.log(this.matches)
  }

  drawChart(data: Match[]): void {

    var arr = []

    for (var i of data) {
      if (i.grade[0] != null) {
        arr.push(
          {
            x: new Date(i.date),
            y: i.grade[0]
          });
      }
    }

    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    var g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
      );

    var x = d3.scaleTime().rangeRound([0, width]);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var line = d3.line<DataType>()
      .x(function (d) { return x(d.x) })
      .y(function (d) { return y(d.y) })
    x.domain(d3.extent(arr, function (d) { return d.x }));
    y.domain(d3.extent(arr, function (d) { return d.y }));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

    g.append("path")
      .datum(arr)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  onRowClicked(row): void {
    console.log('Row clicked: ', row);
  }

  clicked(event: any): void {
    d3.select(event.target).append('circle')
      .attr('cx', event.x)
      .attr('cy', event.y)
      .attr('r', () => {
        return this.radius;
      })
      .attr('fill', 'red');
  }

  ngOnInit() {
    this.getplayer();
    this.getmatches();
  }
}
