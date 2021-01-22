import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public showInput = false;
  public showMobileMenu = false;
  
  constructor(private productService: ProductService,
              private router: Router) { }

    public queryInput: string = this.productService.searchParams.query;
    
  ngOnInit(): void {
  }

  search(query: string) {
    this.router.navigateByUrl('/search');
    this.productService.searchParams.query = query;
    this.queryInput = '';
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

}
