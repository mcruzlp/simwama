import { ProductService } from './product.service';
import { Component } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  products: Observable<Product[]>;
  constructor(private productService: ProductService) {
    this.products = this.productService.getProduct();
  }

  addProduct() {
    const newProduct: Product = {
      productId: '',
      description: 'perfume',
      purchasePrice: 12,
      salePrice: 25,
      stock: 400,
      picture:
        'https://www.perfumeriascoqueteo.com/14373-thickbox_default/agua-fresca-de-rosas.jpg',
    };
    this.productService.addProduct(newProduct);
  }
}
