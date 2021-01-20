import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router) { }

  products: Product[] = this.productService.cartArray;
  total: number = 0;

  ngOnInit(): void {
    this.products.forEach(product => {
      this.total += product.price;
    });
  }

  buy() {
    this.products = [];
    this.total = 0;
    Swal.fire({
      title: 'Pago exitoso',
      icon: 'success',
      text: '¡Gracias por preferirnos!',
      confirmButtonColor: 'purple',
      confirmButtonText: 'Seguir comprando'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
