/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { menuItem } from '../Models/menuItem.model';
import { OrderService } from '../Sevices/order.service';
import { AlertController } from '@ionic/angular';
import { Order } from '../Models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  toppingSelection: menuItem[];
  sizeSelection: menuItem[];
  quantity: string = 'Quantity: none';
  toppings: string = 'Topping: 0';
  toppingSelected;
  size: string = 'Size: 0';
  sizeSelected;

  constructor(private orderService: OrderService, private alertController: AlertController, private router: Router) {}

  ngOnInit()
  {
    this.toppingSelection = this.orderService.getToppings();
    this.sizeSelection = this.orderService.getSizes();
  }

  numberClicked(num)
  {
    if(this.quantity === 'Quantity: none')
    {
      this.quantity = 'Quantity: ' + num;
    }
    else
    {
      this.quantity += num;
    }
  }

  resetClicked()
  {
    this.quantity = 'Quantity: none';
  }

  async showWarning(title, tMessage)
  {
    const alert = await this.alertController.create({
      header: title,
      message: tMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

  addClicked()
  {
    // eslint-disable-next-line radix
    const tempquantity = parseInt(this.quantity.substring(10));
    if(this.toppingSelected && this.sizeSelected && (tempquantity > 0))
    {
    const tOrder: Order = {
      price: this.toppingSelected.multipiler * this.sizeSelected.price,
      totalPrice: Math.floor((this.toppingSelected.multipiler * this.sizeSelected.price * tempquantity) * 100) /100,
      quantity: tempquantity, topping: this.toppingSelected,
      size: this.sizeSelected, time: 'null', id: 1, selected: false
    };
    this.orderService.addToOrder(tOrder);
    console.log('\n Adding to ORDER' + this.orderService.getAllCurrentOrders() + '\n');
    this.quantity = 'Quantity: none';
    this.toppings = 'Topping: 0';
    this.size = 'Size: 0';
    this.toppingSelected = undefined;
    this.sizeSelected = undefined;
  }
    else if(!this.toppingSelected)
    {
      this.showWarning('Error', 'Please Select a topping option');
    }
    else if(!this.sizeSelected)
    {
      this.showWarning('Error', 'Please Select a size option');
    }
    else if(!tempquantity)
    {
      this.showWarning('Error', 'Please Select a Quantity');
    }
  }

  selectTopping(topping){
    if(this.toppingSelected)
    {
      this.toppingSelected.selected = false;
    }
    this.toppingSelected = topping;
    this.toppings = 'Topping: ' + this.toppingSelected.name;
    this.toppingSelected.selected = true;
  }

  selectSize(size){
    if(this.sizeSelected){
      this.sizeSelected.selected = false;
    }
    this.sizeSelected = size;
    this.size = 'Size: ' + this.sizeSelected.name;
    this.sizeSelected.selected = true;
  }

  myOrderClicked()
  {
    this.router.navigate(['/manager']);
  }
}
