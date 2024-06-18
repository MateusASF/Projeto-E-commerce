import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment';

const AUTH_TOKEN = environment.authToken;


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
  userInput: string = '';
  messages: { text: string, user: boolean }[] = [];
  isChatOpen: boolean = false;


  @ViewChildren('lastMessage') messagesElements!: QueryList<ElementRef>;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.product = JSON.parse(sessionStorage.getItem('product') || '{}');
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

  sendMessage() {
    if (this.userInput.trim()) {
      const message = this.userInput.trim();
      this.messages.push({ text: message, user: true });
      this.userInput = '';

      this.getBotResponse(message);
    }
  }

  getBotResponse(message: string) {
    const context = this.getContext();
    const prompt = `
    Contexto: Este é um chat para perguntas sobre relógios de um e-commerce. O usuário pode perguntar sobre marca, modelo, nome, ano, preço, tamanho, material, resistência à água, precisão, estilo, design, caixa, pulseira, mecânica, funcionalidade, luxo, durabilidade, profundidade e outras informações relacionadas a relógios. 
    Responda apenas se a pergunta estiver relacionada a relógios, sempre somente com a resposta de modo resumido, nada além disso. Se a pergunta não estiver relacionada a relógios, responda com "Por favor, pergunte algo no contexto de relógios."
    Aqui está o contexto da conversa até agora, lembre-se de considerá-lo, pois o usuário poderá conversar com você sobre isso:
    ${context}
    Usuário: ${message}
    `;

    this.http.post<any>('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }).subscribe(response => {
      let botMessage = response.choices[0].message.content.trim();
      if (botMessage.startsWith('Mr. August:')) {
        botMessage = botMessage.substring(11).trim();
      }
      this.messages.push({ text: botMessage, user: false });
      document.getElementById("scroll")?.scrollIntoView({ behavior: 'smooth' });
    }, error => {
      console.error('Erro ao obter resposta do Mr. August:', error);
      this.messages.push({ text: 'Erro ao obter resposta do Mr. August.', user: false });
    });
  }

  getContext(): string {
    const contextMessages = this.messages.map(m => m.user ? `Usuário: ${m.text}` : `Mr. August: ${m.text}`).join('\n');
    const watchContext = this.product ? `O relógio atual é um ${this.product.marca} ${this.product.nome} ${this.product.modelo} ${this.product.tamanho} (${this.product.ano}). ${this.product.descricao}` : '';
    return `${watchContext}\n${contextMessages}`;
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  
  ngAfterViewInit() {
    this.messagesElements.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }
  
  scrollToBottom() {
    const lastMessageElement = this.messagesElements.last;
    if (lastMessageElement) {
      lastMessageElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
