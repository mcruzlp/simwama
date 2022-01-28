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
  formButtonText = 'Add product';

  productForm = new FormGroup({
    productId: new FormControl(''),
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
    this.productService
      .getProductById(id)
      .subscribe((data) => this.productForm.patchValue(data));

    this.formButtonText = 'Update product';
  }

  updateProductStep2() {
    this.productService.updateProduct(this.productForm.value);
  }

  formSubmit() {
    this.formButtonText === 'Add product'
      ? this.addProduct()
      : this.updateProductStep2();
  }
}
