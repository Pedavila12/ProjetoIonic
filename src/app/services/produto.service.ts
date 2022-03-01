import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos: Array<any>;
  produtoSelecionado: any;
  constructor() { 
    console.log(this.produtoSelecionado);
    
    if (!this.produtoSelecionado)
      this.produtoSelecionado = 0
    this.produtos = JSON.parse(localStorage.getItem("produtos"))
  }

  setProdutos(produtos : any){
    localStorage.setItem("produtos", JSON.stringify(produtos))

  }
  setSelectProduto(i : number){
    this.produtoSelecionado = i
  }

  getSelectProduto(){
    console.log(this.produtos[this.produtoSelecionado]);
    
    return this.produtos[this.produtoSelecionado]
  }

  addProduto(task : any){
    this.produtos[this.produtoSelecionado].tasks.push(task)
    this.setProdutos(this.produtos)
  }

  updateTask(task : any, i : number){
    this.deleteTask(task)
    
    this.setProdutos(this.produtos)
  }

  setChecked(task : any, i : number){
    this.produtos[this.produtoSelecionado].tasks[i] = task
    this.setProdutos(this.produtos)
  }

  deleteTask(task : any){
    this.produtos[this.produtoSelecionado].tasks = this.produtos[this.produtoSelecionado].tasks.filter(oldTask => oldTask != task)
    this.setProdutos(this.produtos)
  }
}
