import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockApiService {

  constructor(private http: HttpClient) { }

  // getStockData():Observable<any>{
  //   return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo')
  //     .map(
  //       res => {
  //         let response = res['Time Series (1min)'];
  //         console.log(res)
  //         return response;
  //       },
  //       err => {
  //         console.log(err)
  //       }
  //     )
  // }

  getStockData():Observable<any>{
    const req = new HttpRequest('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo', {
      requestProgress: true
    });
    return this.http.request(req).map(
      (event) => {
        return event;
      },
      (err) =>{
        console.log(err);
      }
    )
  }

}
