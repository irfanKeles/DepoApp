import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Currency } from '../../@model/currency';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currenncy:Currency[] = [];
  constructor(
    private _http: HttpClient,
  ) {

  }

  ngOnInit() {
    // this._http.get('https://v6.exchangerate-api.com/v6/03000b0ffef4008088e540a9/latest/USD').subscribe((x:any) => {
    //   this.currenncy = [
    //     { code: 'USD', rate: x.conversion_rates.USD },
    //     { code: 'EUR', rate: x.conversion_rates.EUR },
    //     { code: 'GBP', rate: x.conversion_rates.GBP }
    //   ];
    //   console.log(this.currenncy)
    // },
    //   err => {
    //     console.log(err);
    //   })
  }

}
