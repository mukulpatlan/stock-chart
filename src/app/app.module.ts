import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MzButtonModule, MzInputModule } from 'ng2-materialize';
import { NavbarComponent } from './navbar/navbar.component';
import { MzCardModule } from 'ng2-materialize';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StockLineChartComponent } from './stock-line-chart/stock-line-chart.component'
import { StockApiService } from './stock-line-chart/stock-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LineChartComponent,
    StockLineChartComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    HttpClientModule
  ],
  providers: [StockApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
