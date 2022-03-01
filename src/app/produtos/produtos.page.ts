import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  opcaoSelecionada : string= 'Choker';
  opcoes : Array < number > = [0, 1, 2, 3, 4, 5];
  produtos : Array <any> = [
    {
      titulo : "Choker Matte Violeta",
      preco : "R$28,00",
      quantidade : 0,
      imagem : "../assets/CHOKER-MATTE.png",
      tasks : [{name : "pedro", done: false}]

    },
    {
      titulo : "Choker Matte Verde",
      preco : "R$28,00",
      quantidade : 0,
      imagem : "../assets/CHOKER-MATTE.png",
      tasks : [{name : "adriano", done: false}]

    },
    {
      titulo : "Choker Matte Laranja",
      preco : "R$28,00",
      quantidade : 0,
      imagem : "../assets/CHOKER-MATTE.png",
      tasks : [{name : "pedro", done: false}]

    },
    {
      titulo : "Choker Matte Azul",
      preco : "R$28,00",
      quantidade : 0,
      imagem : "../assets/CHOKER-MATTE.png",
      tasks : [{name : "pedro", done: false}]

    },
    {
      titulo : "Choker Matte Vermelha",
      preco : "R$28,00",
      quantidade : 0,
      imagem : "../assets/CHOKER-MATTE.png",
      tasks : [{name : "pedro", done: false}]

    },
  ]
  constructor(private produtosService : ProdutoService, private router : Router) { 
    
  }

  ngOnInit() {
    const produtosSalvos = this.produtosService.produtos
      if(produtosSalvos)
        this.produtos = produtosSalvos
      
  }

  selecionar(ev: any){
    console.log(ev);

    this.opcaoSelecionada = ev.detail.value;
  }

  selectChange(){
    this.produtosService.setProdutos(this.produtos)
  }

  selecionaProduto(i: number){
    console.log(i);
    
    this.produtosService.setSelectProduto(i)
    this.router.navigate(["home"])
  }

}
