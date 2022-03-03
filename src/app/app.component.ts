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
  displayConfirmDelete = false;
  idForDeletion = '';
  descriptionForDeletion = '';

  constructor(public productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    this.formButtonText = 'Add product';
    this.productForm.reset({ salePrice: 0, purchasePrice: 0, stock: 0 });
    this.productService.addProduct(this.productForm.value);
    console.log('addProduct');
  }

  updateProductStep1(id: string) {
    this.formButtonText = 'Update product';
    this.productService.getProduct(id).subscribe((data) => {
      this.productForm.patchValue(data);
      console.log('data: ' + JSON.stringify(data));
    });
  }

  updateProductStep2() {
    this.productService.updateProduct(this.productForm.value);
    console.log('updateProduct');
  }

  formSubmit() {
    if (this.formButtonText === 'Update product') {
      this.updateProductStep2();
    } else {
      this.addProduct();
    }

    this.displayProductForm = false;
  }

  confirmDeleteProduct(product: Product) {
    this.idForDeletion = product.productId;
    this.descriptionForDeletion = product.description;
    this.displayConfirmDelete = true;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.idForDeletion);
    this.displayConfirmDelete = false;
  }
}
