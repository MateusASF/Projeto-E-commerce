import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-produto',
  templateUrl: './info-produto.component.html',
  styleUrls: ['./info-produto.component.css']
})
export class InfoProdutoComponent implements OnInit{
  product: any;
  quantity = 1;
  currentImageIndex = 0;
  autoChangeImageInterval?: number;

  constructor() { }

  ngOnInit(): void {
    this.product = JSON.parse(sessionStorage.getItem('product') || '{}');
    console.log(this.product);
    this.startAutoChangeImage();
  }

  ngOnDestroy(): void {
    if (this.autoChangeImageInterval) {
      clearInterval(this.autoChangeImageInterval);
    }
  }

  startAutoChangeImage(): void {
    this.autoChangeImageInterval = window.setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.imagens.length;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
    if (this.autoChangeImageInterval) {
      clearInterval(this.autoChangeImageInterval);
    }
    this.startAutoChangeImage();
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  addToCart(): void {
    const cart = localStorage.getItem('cart');
    let cartItems = [];

    if (cart) {
      cartItems = JSON.parse(cart);
    }

    cartItems.push({
      product: this.product,
      quantity: this.quantity,
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));

    alert('Produto adicionado ao carrinho!');
  }

  finalizarCompra() {
    var carrinhoImediato = [];
    carrinhoImediato.push({
      product: this.product,
      quantity: this.quantity,
    })
    sessionStorage.setItem('carrinhoImediato', JSON.stringify(carrinhoImediato));

    location.href = '/login';
  }
}
