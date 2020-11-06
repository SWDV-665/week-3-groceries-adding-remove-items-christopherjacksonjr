import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'Grocery List';

  items = [
    {
      name: 'Milk',
      quantity: 2
    },
    {
      name: 'Bread',
      quantity: 1
    },
    {
      name: 'Banana',
      quantity: 3
    },
    {
      name: 'Sugar',
      quantity: 1
    }
  ];
  
  constructor(private toastCtrl: ToastController, public alertController: AlertController) {};

  /*Function to remove items from list*/ 
  async removeItem(item, index) {
    console.log('Removed ' + item.name + '.');
    /*Declaring toast then present to screen*/
    let toast = await this.toastCtrl.create({
      message: 'Removed ' + item.name + '.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();

    /*Removing item from array*/
    this.items.splice(index, 1);
  }

  /*Function to add items to list*/
  addItem() {
    console.log('Adding new item.');
    this.showAddItemPrompt();
  }

  /*Pop up dialouge to allow users to enter item information to be added to list*/
  async showAddItemPrompt() {
    /*Presenting alert with form for user to enter data of new item*/
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      message: 'Please enter item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            /*Adding item to array*/
            this.items.push(item);
          }
        }
      ]
    });

    await alert.present();
  }
}
