import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit(): void {
    // Fetch data or perform any necessary setup here
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const data = [
      { category: 'Finance', value: 3 },
      { category: 'Mathematics', value: 5 },
      { category: 'Computer Science', value: 11 },
      { category: 'Engineering Technology', value: 19 },
      { category: 'Health Professions', value: 17 }
    ];

    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(d3.schemeCategory10);

    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.category) as string);

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#fff')
      .text(d => d.data.category);
  }
}
