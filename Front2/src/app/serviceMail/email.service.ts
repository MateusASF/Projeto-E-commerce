import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'augusts_clock03';
  private userId = 'Z_mu118_bXpvTSvqX';

  constructor() { }

  sendEmailCompra(compra: any): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_name: compra.cliente.nome,
      cliente_nome: compra.cliente.nome,
      cliente_email: "appdomat@gmail.com",
      cliente_telefone: compra.cliente.telefones[0].numeroTelefone,
      cliente_endereco: `${compra.cliente.enderecosEntrega.logradouro}, ${compra.cliente.enderecosEntrega.numero}, ${compra.cliente.enderecosEntrega.bairro}, ${compra.cliente.enderecosEntrega.cidade}, ${compra.cliente.enderecosEntrega.estado}, ${compra.cliente.enderecosEntrega.pais} - ${compra.cliente.enderecosEntrega.cep}`,
      itens: compra.itens.map((item: any) => ({
        nome: item.nome,
        marca: item.marca,
        modelo: item.modelo,
        quantidade: item.quantidade,
        preco: item.preco,
        descricao: item.descricao,
      })),
      total: compra.total,
      frete: compra.frete,
      status: compra.status,
      data: new Date(compra.data).toLocaleDateString(),
    };

    return emailjs.send(this.serviceId, "template_j473spt", templateParams, this.userId);
  }

  sendEmailTroca(exchangeData: any): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_name: exchangeData.to_name,
      to_email: exchangeData.to_email,
      codTroca: exchangeData.codTroca,
      motivo: exchangeData.motivo,
      itens: exchangeData.itens.map((item: any) => ({
        nome: item.nome,
        marca: item.marca,
        modelo: item.modelo,
        quantidade: item.quantidade,
        valor: item.valor
      })),
      valor: exchangeData.valor
    };

    return emailjs.send(this.serviceId, 'template_hgcp8lj', templateParams, this.userId);
  }
}
