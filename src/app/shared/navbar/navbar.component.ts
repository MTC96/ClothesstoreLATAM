import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
  }

  search(query: string) {
    this.router.navigateByUrl('/search');
    this.productService.searchParams.query = query;
  }

}
