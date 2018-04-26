import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Chart, pattern } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  socket;
  memChart = undefined;
  // cpuChart = undefined;
  cpuType = '';
  noOfCpu = '';
  ngOnInit() {
    // this.socket = io.connect('http://localhost:9500');
    // // ---------------------------------------------------Section II
    // const ctx = document.getElementById('mChart');
    // const sChart = document.getElementById('sChart');
    // console.log(sChart)
    // const doughnutGraphData = {
    //   datasets: [{
    //     data: [1, 0],
    //     backgroundColor: ['#36a2eb', '#ff6384'],
    //   }],
    //   labels: [
    //     'Free',
    //     'Used',
    //   ]
    // };
    // this.memChart = new Chart(ctx, {
    //   type: 'doughnut',
    //   data: doughnutGraphData,
    //   options: {}
    // });
    //     this.socket.on('connected', (connectData) => this.connected(connectData));
    //     this.socket.on('os-update', (event) => this.updateCharts(event));
  }

  // -----------------------------------------------------------------------Section IV
  // updateCharts(event) {

  //   this.memChart.data.labels.pop();
  //   this.memChart.data.labels.pop();
  //   this.memChart.data.labels.push(`Free:${this.formatBytes(event.freemem, 2)}`);
  //   this.memChart.data.labels.push(`Used:${this.formatBytes(event.totalmem - event.freemem, 2)}`);

  //   this.memChart.data.datasets.forEach((dataset) => {
  //     dataset.data.pop();
  //     dataset.data.pop();
  //     dataset.data.push(event.freemem);
  //     dataset.data.push(event.totalmem - event.freemem);
  //   });
  //   this.memChart.update(0);

  //   // this.cpuChart.data.datasets.forEach((dataset) => {
  //   //   if ( dataset.data.length > 9) {
  //   //     dataset.data.shift();
  //   //   }
  //   //   dataset.data.push(event.loadavg[2]);
  //   // });
  //   // this.cpuChart.update(0);
  // }

  // formatBytes(bytes, decimals) {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1000,
  //     dm = decimals || 2,
  //     sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  //     i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }

  // connected(connectData) {
  //   this.cpuType = connectData.types;
  //   this.noOfCpu = connectData.cpus;
  // }
  // public barChartOptions:any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  //   public barChartOptions:any = {
  //     scales: {
  //         yAxes: [{
  //             stacked: true
  //         }]
  //     }
  // };


  //   //Chart Labels
  //   public barChartLabels:string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  //   public barChartType:string = 'line';
  //   public barChartLegend:boolean = true;

  //   //Chart data
  //   public barChartData:any[] = [
  //     {data: [66, 55, 83, 82, 56, 51, 43], label: 'Loss'},
  //     {data: [29, 38, 40, 21, 82, 30, 89], label: 'Profit'}
  //   ];

  //   // Chart events
  //   public chartClicked(e:any):void {
  //     console.log(e);
  //   }

  //   // Chart events
  //   public chartHovered(e:any):void {
  //     console.log(e);
  //   }
}
