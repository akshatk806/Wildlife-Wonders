import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = "";

  constructor(private productService: ProductService, 
    private cartService: CartService,
    private snackBar: MatSnackBar) { }

  // as soon as component renders we have our data fetched
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;   // initilize filteredProducts to all products
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        // show the snackbar
        this.snackBar.open("Product added to cart!", "", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });  
      }
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string): void {
    this.sortOrder = sortValue;

    // sorting
    if(this.sortOrder === "priceLowHigh") {
      this.filteredProducts.sort((a: Product, b: Product) => a.price - b.price)
    }
    else if(this.sortOrder === "priceHighLow") {
      this.filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
    }
  }
}
