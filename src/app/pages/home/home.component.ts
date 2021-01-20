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
        for (let i = 0; i < 4; i++) {
          const randomProduct = this.getRandomItem();
          this.mw_products.push(randomProduct);
        }
      });
  }

  getRandomItem(): Product {
    const randomIndex = Math.floor(Math.random() * this.products.length);
    const product = this.products[randomIndex];
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return product;
  }

}
