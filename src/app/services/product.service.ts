import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { LoadProducts } from '../interfaces/load-products.interface';
import { LoadCategories } from '../interfaces/load-categories.interface';
import { LoadDetails } from '../interfaces/load-details.interface';
import { SearchParams } from '../interfaces/search-params.interface';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchParams : SearchParams = {
    query: 'jeans',
    offset: 0
  }
  childrenCategories: any[] = [];
  cartArray: any[] = [];

  constructor(private http: HttpClient) { }

  loadProducts(category: string = 'MCO1430', offset: number = 0) {
    const url = `${ url_base }/sites/MCO/search?category=${ category }&limit=48&offset=${ offset }`;
    return this.http.get<LoadProducts>(url);
  }

  loadProductsByQuery(query: string, offset: number = 0) {
    const url = `${ url_base }/sites/MCO/search?q=${ query }&limit=50&offset=${ offset }`;
    return this.http.get<LoadProducts>(url);
  }

  loadCategories(category: string = 'MCO1430'){
    const url = `${ url_base }/categories/${ category }`;
    this.http.get<LoadCategories>(url)
    .subscribe(({ children_categories }) => {
      children_categories.map( subCategory => {
        this.childrenCategories.push(subCategory.id);
      });
    });
  }

  loadDetails(item_id: string) {
    const url = `${ url_base }/items/${ item_id }?include_attributes=all`;
    return this.http.get<LoadDetails>(url);
  }
}
