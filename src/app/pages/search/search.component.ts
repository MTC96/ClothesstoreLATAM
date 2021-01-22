import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  public totalResults: number = 0;
  public products: Product[] = [];

  constructor(public productService: ProductService) { }


  query: string = this.productService.searchParams.query;
  querySubs: Subscription;

  ngOnInit(): void {
    if (this.query == '') {
      this.query = 'Jeans';
    }
    this.loadProductsByQuery(this.query);
    this.observeQuery();
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  loadProductsByQuery(q: string, offset: number = 0) {
    this.productService.searchParams.offset = offset;
    this.productService.loadProductsByQuery(q, offset)
      .subscribe(({ results }) => {
        results.map(product => {
          product.thumbnail = product.thumbnail.replace('-I.', '-V.');
        });
        this.products = results;
      });
  }

  observeQuery() {
    const obs$ = new Observable<string>(observer => {
      setInterval(() => {
        observer.next(this.productService.searchParams.query);
      }, 100);
    });
    this.querySubs = obs$.subscribe(resp => {
      if (resp != this.query && resp.length != 0) {
        this.query = resp;
        this.loadProductsByQuery(this.query);
      }
    });
  }
}
