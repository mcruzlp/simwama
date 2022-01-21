import { ProductService } from './product.service';
import { Component } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  products: Observable<Product[]>;

  productForm = new FormGroup({
    description: new FormControl(''),
    purchasePrice: new FormControl(0),
    salePrice: new FormControl(0),
    stock: new FormControl(0),
    picture: new FormControl(''),
  });

  constructor(public productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value);
    this.productForm.reset();
  }

  updateProductStep1(id: string) {
    //this.productForm = this.productService.getProductById(id);
  }
}
