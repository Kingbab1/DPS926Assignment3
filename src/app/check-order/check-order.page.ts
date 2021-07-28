import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Order } from '../Models/order.model';
import { OrderService } from '../Sevices/order.service';

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.page.html',
  styleUrls: ['./check-order.page.scss'],
})
export class CheckOrderPage implements OnInit {

  currentOrderList: Order[];
  totalCost =  0;
  totalNum =  0;

  constructor(private orderService: OrderService, private alertController: AlertController, private router: Router) { }
  
  async showWarning(title, tMessage)
  {
    const alert = await this.alertController.create({
      header: title,
      message: tMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.orderService.printCurrentOrder();
    this.currentOrderList = this.orderService.getAllCurrentOrders();
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.totalNum = this.orderService.getTotalQuantity();
    this.totalCost =  Math.floor(this.orderService.getTotalCost() * 100) / 100;
    console.log('Total Cost: $' + this.totalCost + ' Total Num: ' + this.totalNum);
  }

  placeOrderClicked(){
    this.orderService.placeOrder();
    this.showWarning('Success!', 'Your Order of ' + this.totalNum + ' Pizzas has been placed and will cost: $' + this.totalCost );
    this.router.navigate(['/home']);
  }

}
