import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  products: Observable<Product[]>;

  productForm = new FormGroup({
    productId: new FormControl(''),
    description: new FormControl(''),
    purchasePrice: new FormControl(0),
    salePrice: new FormControl(0),
    stock: new FormControl(0),
    picture: new FormControl(''),
  });

  formButtonText = 'Add product';
  displayProductForm = false;

  constructor(public productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value);
    this.productForm.reset({ salePrice: 0, purchasePrice: 0, stock: 0 });
    console.log('addProduct');
  }

  updateProductStep1(id: string) {
    this.productService.getProduct(id).subscribe((data) => {
      this.productForm.patchValue(data);
      console.log('data: ' + JSON.stringify(data));
    });

    this.formButtonText = 'Update product';
  }

  updateProductStep2() {
    this.productService.updateProduct(this.productForm.value);
    console.log('updateProduct');
  }

  formSubmit() {
    this.formButtonText === 'Add product'
      ? this.addProduct()
      : this.updateProductStep2();
  }
}
