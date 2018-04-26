import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';;
import { Chart, pattern } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  socket;
  cpuChart = undefined;
  cpuType = '';
  noOfCpu = '';
  public lineChartLegend:boolean = true;
  ngOnInit() {
    //connect to socket
    this.socket = io.connect('http://localhost:9500');

    // get the chart
    const ctx2 = document.getElementById('cChart');
    const cpuLoadGraphData = {
      datasets: [{
        label: '15 min average',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: '#76ced5',
        fill: false
      }],
      labels: [this.getTime()],
 
    };
    this.cpuChart = new Chart(ctx2, {
      type: 'line',
      data: cpuLoadGraphData,
      options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
      }
    });
    
    //on connection open socket
    this.socket.on('connected', (connectData) => this.connected(connectData));
    //update for data
    this.socket.on('os-update', (event) => this.updateCharts(event));
  }

  getTime(){
    let time = new Date();
    return time.getHours()+ ':' + time.getMinutes() + ':' + time.getSeconds();
  }
 
  // Update chart
  updateCharts(event) {
 
    this.cpuChart.data.datasets.forEach((dataset) => {
      if ( dataset.data.length > 9) {
        dataset.data.shift();
      }
      dataset.data.push(event.loadavg[2]);
    });
    if(this.cpuChart.data.labels.length > 3){
      this.cpuChart.data.labels.pop();
    }
    this.cpuChart.data.labels.push(this.getTime());
    this.cpuChart.update(0);
  }
 
  // format data
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1000,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
 
  // Connect to cpu
  connected(connectData) {
    this.cpuType = connectData.types;
    this.noOfCpu = connectData.cpus;
  }
}
