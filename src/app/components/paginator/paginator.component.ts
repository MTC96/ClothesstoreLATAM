import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { SearchParams } from 'src/app/interfaces/search-params.interface';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  offsetArr: number[] = [0];
  page: number = 1;
  query: string = this.productService.searchParams.query;
  querySubs: Subscription;
  
  @Output() offsetOut: EventEmitter<number> = new EventEmitter();

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.observeParams();
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  changePage(value: number) {
    const offset: number = this.productService.searchParams.offset;
    if (!this.offsetArr.includes(offset)) {
      this.offsetArr.push(offset);
    }
    this.productService.searchParams.offset = this.offsetArr[this.page - 1 + value];
    if (this.productService.searchParams.offset > 1000) {
      this.productService.searchParams.offset = this.offsetArr[this.page - 1];
    }
    if (value < 0) {
      this.page -= 1;
    } else if (value > 0){
      this.page += 1;
    }
    this.offsetOut.emit(this.productService.searchParams.offset);
  }

  observeParams() {
    const obs$ = new Observable<SearchParams>(observer => {
      setInterval(() => {
        observer.next(this.productService.searchParams);
      }, 100);
    });
    this.querySubs = obs$.subscribe(resp => {
      if (resp.query != this.query && resp.query.length != 0) {
        this.query = resp.query;
        this.productService.searchParams.offset = 0;
        this.page = 1;
        this.offsetArr = [0];
      }
    });
  }

}
