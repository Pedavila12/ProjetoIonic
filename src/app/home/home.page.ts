import { ProdutoService } from './../services/produto.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks : any[] =[];
  produto : any;

  constructor(private alertCtrl : AlertController, private toastCtrl : ToastController, private actionSheet : ActionSheetController, private produtoService : ProdutoService) {
    this.produto = this.produtoService.getSelectProduto()
    this.tasks = this.produto.tasks
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'Oque deseja fazer'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel')
            
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form.newTask);

            this.add(form.newTask)
          }
        }

      ]
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  async add(newTask : string){
    if(newTask.trim().length <1){
      const toast = await this.toastCtrl.create({
        message : 'Informe oque deseja fazer!',
        duration : 2000,
        position : 'top'
      });

      toast.present();
      return;
    }

    let task = {name : newTask, done: false}

    this.produtoService.addProduto(task)

  }

  updateLocalStorage(){
    localStorage.setItem('taskDb',JSON.stringify(this.tasks));
  }

  async openActions(task: any, i : number){
    const actionSheet = await this.actionSheet.create({
      header: 'O QUE DESEJA FAZER?',
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;

          this.produtoService.setChecked(task, i)
        }
      }, 
    {
         
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  delete(task: any){
    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.produtoService.deleteTask(task)
  }

  
  edit(task: any, i: number){
    
    this.showAdd().then(()=> {
      this.tasks = this.tasks.filter(oldTask => oldTask != task)
      this.produtoService.updateTask(task, i)
    })
  }
  
}
