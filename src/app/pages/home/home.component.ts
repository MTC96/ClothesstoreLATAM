import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];
  public mw_products: Product[] = [];
  public mw_productsLength = 0;
  public mobileIndex = 0;
  public isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.loadProducts()
      .subscribe(({ paging: { total }, results }) => {
        results.map(product => {
          product.thumbnail = product.thumbnail.replace('-I.', '-V.');
        });
        this.products = results;
        this.mw_productsLength = this.products.length;
        for (let i = 0; i < this.products.length; i) {
          const randomProduct = this.getRandomItem();
          this.mw_products.push(randomProduct);
        }
        this.isLoading = false;
      });
  }

  getRandomItem(): Product {
    const randomIndex = Math.floor(Math.random() * this.products.length);
    const product = this.products[randomIndex];
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return product;
  }

  changeCards(value: number) {
    let index = this.mobileIndex += value;
    if (index < 0) {
      index += this.mw_productsLength;
    } else if (index >= this.mw_productsLength) {
      index -= this.mw_productsLength;
    }
    this.mobileIndex = index;
  }

}
