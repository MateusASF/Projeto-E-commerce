import { Component } from '@angular/core';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css']
})
export class TrocarSenhaComponent {
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmaNovaSenha: string = '';
  senhaAlterada: string = '';

  trocarSenha() {
    try{
      if(this.senhaAtual === '' || this.novaSenha === '' || this.confirmaNovaSenha === ''){
        throw new Error('Preencha todos os campos');
      }
      if(this.novaSenha !== this.confirmaNovaSenha){
        throw new Error('As senhas não coincidem');
      } else {
        this.senhaAlterada = this.confirmaNovaSenha;
      }

      var senhaNoBanco = this.getSenhaAtual();

      if(this.senhaAtual !== senhaNoBanco){
        throw new Error('Senha atual incorreta');
      }

      var idUser = JSON.parse(sessionStorage.getItem('cliente')!).id;

      fetch('http://localhost:3009/alterarSenha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idUser, senha: this.senhaAlterada })
      })
      .then(response => {
        sessionStorage.clear();
        alert('Senha alterada com sucesso');
        location.href = 'cliente/listar';
      })
    } catch(e: any){
      alert(e.message);
    }
  }

  getSenhaAtual() {
    const cliente = JSON.parse(sessionStorage.getItem('cliente')!);
    const senha = cliente.senha;
    if (senha) {
      const decodedSenha = atob(senha);
      return decodedSenha;
    }
    return '';
  }
}
