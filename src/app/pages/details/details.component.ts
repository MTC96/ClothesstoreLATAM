import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  index: number = 0;
  id: string;
  pictures: string[] = [];
  free_shipping: boolean;
  title: string = 'No title';
  price: number = 0;
  thumbnail: string = '';
  available_quantity: number = 0;

  constructor(private productService: ProductService,
              private actRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
    this.getDetails(this.id);
  }

  getDetails(id: string) {
    this.productService.loadDetails(id)
      .subscribe(resp => {
        resp.pictures.map(picture => {
          this.pictures.push(picture.url);
        });
        this.title = resp.title;
        this.price = resp.price;
        this.available_quantity = resp.available_quantity;
        this.free_shipping = resp.shipping.free_shipping;
        this.thumbnail = resp.thumbnail;
      });
  }

  changeImage(index: number) {
    let newIndex = this.index + index;
    const maxIndex = this.pictures.length;
    if (newIndex >= maxIndex) {
      newIndex -= maxIndex;
    } else if (newIndex < 0) {
      newIndex += maxIndex;
    }
    this.index = newIndex;
  }

  buy() {
    let product = {
      thumbnail: '',
      title: '',
      price: 0
    };
    product.thumbnail = this.thumbnail;
    product.title = this.title;
    product.price = this.price;
    this.productService.cartArray.push(product);
    Swal.fire({
      title: 'Comprar',
      icon: 'success',
      text: 'Compra agregada al carrito.',
      showCancelButton: true,
      confirmButtonColor: 'purple',
      cancelButtonText: 'Seguir comprando',
      confirmButtonText: 'Ir al carrito'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/cart');
      }
    });
  }

}
