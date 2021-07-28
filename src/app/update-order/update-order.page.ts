import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Order } from '../Models/order.model';
import { OrderService } from '../Sevices/order.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.page.html',
  styleUrls: ['./update-order.page.scss'],
})
export class UpdateOrderPage implements OnInit {

  currentOrderList: Order[];
  totalCost =  0;
  totalNum =  0;
  selectedOrder;

  constructor(private orderService: OrderService, private alertController: AlertController) { }

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
    this.totalCost = this.orderService.getTotalCost();
    console.log('Total Cost: $' + this.totalCost + ' Total Num: ' + this.totalNum);
  }

  itemSelected(orderItem){
    this.orderService.uselectAllCurrentOrders();
    console.log('Selected: ' + orderItem.id);
    if(this.selectedOrder)
    {
      console.log('PRINTING: ' + this.selectedOrder);
      if(this.selectedOrder.id === orderItem.id)
      {
        const index = this.currentOrderList.indexOf(orderItem);
        this.currentOrderList[index].selected = false;
        this.selectedOrder = undefined;
      }
      else{
        
        const index = this.currentOrderList.indexOf(orderItem);
        this.currentOrderList[index].selected = true;
        this.selectedOrder = orderItem;
      }
    }
    else {
      
      const index = this.currentOrderList.indexOf(orderItem);
        this.currentOrderList[index].selected = true;
      this.selectedOrder = orderItem;
    }

    console.log('Selected Item ID: ' + this.selectedOrder.id);
  }

  deleteClicked(){
    console.log('Done Clicked');
    if(this.selectedOrder !== undefined)
    {
      this.orderService.deleteOrder(this.selectedOrder);
      this.currentOrderList = this.orderService.getAllCurrentOrders();
      this.totalNum = this.orderService.getTotalQuantity();
      this.totalCost = this.orderService.getTotalCost();
      console.log('Total Cost: $' + this.totalCost + ' Total Num: ' + this.totalNum);
      this.selectedOrder = undefined;
    }

  }

}
