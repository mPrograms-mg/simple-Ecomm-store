import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from 'src/models/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productCaroselList: undefined | product[];
  allProduct: undefined | product[];
  removeCart = false;
  constructor(private product: ProductsService) {}

  ngOnInit(): void {
    this.product.limitedProductShow().subscribe((res: product[]) => {
      this.productCaroselList = res;
    });

    this.product.productList().subscribe((respo) => {
      this.allProduct = respo;
    });
  }

  AddToCart(id: number) {
    let newProduct = this.allProduct;
    newProduct = newProduct.filter((item: product) => id == item.id);
    // console.log(newProduct);
    this.product.localAddToCart(newProduct[0]);
    this.removeCart = true;
  }
}
