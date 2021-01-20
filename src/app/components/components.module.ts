import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselComponent } from './carousel/carousel.component';
import { CardComponent } from './card/card.component';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    CarouselComponent,
    CardComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CarouselComponent,
    CardComponent,
    PaginatorComponent
  ]
})
export class ComponentsModule { }
