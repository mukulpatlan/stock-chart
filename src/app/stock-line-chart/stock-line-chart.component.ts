import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StockApiService } from './stock-api.service';
import { Chart, pattern } from 'chart.js';
import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-stock-line-chart',
  templateUrl: './stock-line-chart.component.html',
  styleUrls: ['./stock-line-chart.component.css'],
  providers: [DatePipe]
})
export class StockLineChartComponent implements OnInit {
  stockData;
  stockChart = undefined;
  showSpinner;
  progressText = "";
  showData: Boolean = false;
  @ViewChild('sChart') sChart: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(private stockApi: StockApiService, private datePipe: DatePipe) { }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.sChart.nativeElement).getContext('2d');
  }

  ngOnInit() {
    this.showSpinner = true;
    const ctx2 = document.getElementById('sChart');
    this.stockApi.getStockData().subscribe(
      (event: HttpEvent<any>) => {
        console.log(event)
        switch (event.type) {
          case HttpEventType.Sent:
            this.showSpinner = true;
            this.progressText = 'Request sent!';
            console.log('Request sent!');
            break;
          case HttpEventType.ResponseHeader:
            this.progressText = 'Response header received!'
            console.log('Response header received!');
            break;
          case HttpEventType.UploadProgress:
            const percentDone = Math.round(100 * event.loaded / event.total);
            this.progressText = `File is ${percentDone}% uploaded.`;
            console.log(`File is ${percentDone}% uploaded.`);
          case HttpEventType.DownloadProgress:
            const kbLoaded = Math.round(event.loaded / 1024);
            this.progressText = `Download in progress! ${kbLoaded}Kb loaded`;
            console.log(`Download in progress! ${kbLoaded}Kb loaded`);
            break;
          case HttpEventType.Response:
            {
              console.log('😺 Done!', event.body);
              this.progressText = `Done!`;
              this.showSpinner = false;
              let data = event.body['Time Series (1min)'];
              this.plotGraph(data);
            }
        }
      }
    )
    // this.stockData = this.stockApi.getStockData().subscribe(
    //   (res) => {
    //   console.log(res);
    //   let label = [];
    //   const loadGraphData = {
    //     datasets: [{
    //       label: '',
    //       data: []
    //     }],
    //     labels: []
    //   };
    //   let highLoadGraphData = [];
    //   let openLoadGraphData = [];
    //   let lowLoadGraphData = [];
    //   let closeLoadGraphData = [];
    //   for(let d in res){
    //     openLoadGraphData.push(res[d]['1. open'])
    //     highLoadGraphData.push(res[d]['2. high'])
    //     lowLoadGraphData.push(res[d]['3. low'])
    //     closeLoadGraphData.push(res[d]['4. close'])
    //   }
    //   let open = {
    //     label: "Open",
    //     fill: false,
    //     lineTension: 0.1,
    //     backgroundColor: "rgb(134, 133, 245)",
    //     borderColor: "blue", // The main line color
    //     borderCapStyle: 'square',
    //     borderDash: [], // try [5, 15] for instance
    //     borderDashOffset: 0.0,
    //     borderJoinStyle: 'miter',
    //     pointBorderColor: "black",
    //     pointBackgroundColor: "white",
    //     pointBorderWidth: 1,
    //     pointHoverRadius: 8,
    //     pointHoverBackgroundColor: "rgb(134, 133, 245)",
    //     pointHoverBorderColor: "blue",
    //     pointHoverBorderWidth: 2,
    //     pointRadius: 4,
    //     pointHitRadius: 10,
    //     // notice the gap in the data and the spanGaps: true
    //     data: openLoadGraphData,
    //     spanGaps: true,
    //   };
    //   let high = {
    //     label: "High",
    //     fill: true,
    //     lineTension: 0.1,
    //     backgroundColor: "rgb(201, 169, 126)",
    //     borderColor: "rgb(167, 105, 0)",
    //     borderCapStyle: 'butt',
    //     borderDash: [],
    //     borderDashOffset: 0.0,
    //     borderJoinStyle: 'miter',
    //     pointBorderColor: "white",
    //     pointBackgroundColor: "black",
    //     pointBorderWidth: 1,
    //     pointHoverRadius: 8,
    //     pointHoverBackgroundColor: "rgb(201, 169, 126)",
    //     pointHoverBorderColor: "rgb(167, 105, 0)",
    //     pointHoverBorderWidth: 2,
    //     pointRadius: 4,
    //     pointHitRadius: 10,
    //     // notice the gap in the data and the spanGaps: true
    //     data: highLoadGraphData,
    //     spanGaps: true,
    //   };
    //   let low = {
    //     label: "Low",
    //     fill: false,
    //     lineTension: 0.1,
    //     backgroundColor: "rgb(240, 128, 126)",
    //     borderColor: "red", // The main line color
    //     borderCapStyle: 'square',
    //     borderDash: [], // try [5, 15] for instance
    //     borderDashOffset: 0.0,
    //     borderJoinStyle: 'miter',
    //     pointBorderColor: "black",
    //     pointBackgroundColor: "white",
    //     pointBorderWidth: 1,
    //     pointHoverRadius: 8,
    //     pointHoverBackgroundColor: "rgb(240, 128, 126)",
    //     pointHoverBorderColor: "red",
    //     pointHoverBorderWidth: 2,
    //     pointRadius: 4,
    //     pointHitRadius: 10,
    //     // notice the gap in the data and the spanGaps: true
    //     data: lowLoadGraphData,
    //     spanGaps: true,
    //   };
    //   let close = {
    //     label: "Close",
    //     fill: false,
    //     lineTension: 0.1,
    //     backgroundColor: "rgb(167, 236, 134)",
    //     borderColor: "rgba(116, 237, 24, 0.96)", // The main line color
    //     borderCapStyle: 'square',
    //     borderDash: [], // try [5, 15] for instance
    //     borderDashOffset: 0.0,
    //     borderJoinStyle: 'miter',
    //     pointBorderColor: "black",
    //     pointBackgroundColor: "white",
    //     pointBorderWidth: 1,
    //     pointHoverRadius: 8,
    //     pointHoverBackgroundColor: "rgb(167, 236, 134)",
    //     pointHoverBorderColor: "rgba(116, 237, 24, 0.96)",
    //     pointHoverBorderWidth: 2,
    //     pointRadius: 4,
    //     pointHitRadius: 10,
    //     // notice the gap in the data and the spanGaps: true
    //     data: closeLoadGraphData,
    //     spanGaps: true,
    //   };
    //   loadGraphData.datasets.push(open, low, close, high);
    //   for(let d in res){
    //     let date = this.datePipe.transform(d, 'HH:mm');
    //     loadGraphData.labels.push(date);
    //   }
    // //  console.log(loadGraphData);
    //   this.stockChart = new Chart(ctx2, {
    //     type: 'line',
    //     data: loadGraphData,
    //     options: {
    //       legend: {
    //         display: true,
    //         labels: {
    //           fontColor: 'rgb(0, 0, 0)',
    //           fontSize: 16
    //         }
    //       }
    //     }
    //   });
    // }
    // )
  }

  plotGraph(data){
    const ctx2 = document.getElementById('sChart');
    let label = [];
    const loadGraphData = {
      datasets: [{
        label: '',
        data: []
      }],
      labels: []
    };
    let highLoadGraphData = [];
    let openLoadGraphData = [];
    let lowLoadGraphData = [];
    let closeLoadGraphData = [];
    for (let d in data) {
      openLoadGraphData.push(data[d]['1. open'])
      highLoadGraphData.push(data[d]['2. high'])
      lowLoadGraphData.push(data[d]['3. low'])
      closeLoadGraphData.push(data[d]['4. close'])
    }
    let open = {
      label: "Open",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(134, 133, 245)",
      borderColor: "blue", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgb(134, 133, 245)",
      pointHoverBorderColor: "blue",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: openLoadGraphData,
      spanGaps: true,
    };
    let high = {
      label: "High",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgb(201, 169, 126)",
      borderColor: "rgb(167, 105, 0)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "white",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgb(201, 169, 126)",
      pointHoverBorderColor: "rgb(167, 105, 0)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: highLoadGraphData,
      spanGaps: true,
    };
    let low = {
      label: "Low",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(240, 128, 126)",
      borderColor: "red", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgb(240, 128, 126)",
      pointHoverBorderColor: "red",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: lowLoadGraphData,
      spanGaps: true,
    };
    let close = {
      label: "Close",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(167, 236, 134)",
      borderColor: "rgba(116, 237, 24, 0.96)", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgb(167, 236, 134)",
      pointHoverBorderColor: "rgba(116, 237, 24, 0.96)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: closeLoadGraphData,
      spanGaps: true,
    };
    loadGraphData.datasets.push(open, low, close, high);
    for (let d in data) {
      let date = this.datePipe.transform(d, 'HH:mm');
      loadGraphData.labels.push(date);
    }
    //  console.log(loadGraphData);
    this.stockChart = new Chart(this.context, {
      type: 'line',
      data: loadGraphData,
      options: {
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(0, 0, 0)',
            fontSize: 16
          }
        }
      }
    });
    this.showData = true;
  }

}
