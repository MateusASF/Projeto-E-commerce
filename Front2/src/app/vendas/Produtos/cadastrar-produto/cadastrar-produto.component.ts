import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent {
  form! : any;
  produto = {} as any;
  selectedImages: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      marca: new FormControl(''),
      ano: new FormControl(''),
      nome: new FormControl(''),
      modelo: new FormControl(''),
      codRelogio: new FormControl(''),
      genero: new FormControl(''),
      tamanho: new FormControl(''),
      preco: new FormControl(''),
      categoria: new FormControl(''),
    });
    this.produto.imagens = [];
  }

  onSubmit() {
    console.log(this.form.value);
  }


  handleAdditionalFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result;
      this.produto.imagens.push(base64Image as string);
      this.selectedImages.push(base64Image as string);
    };
    reader.readAsDataURL(file);

    console.log(this.produto);
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.produto.imagens.splice(index, 1);
  }

  // getImagem() {
  //   const base64Image = localStorage.getItem('imagem');
  //   return base64Image;
  // }
}
