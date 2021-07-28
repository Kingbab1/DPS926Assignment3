import { Component, OnInit } from '@angular/core';
import { Order } from '../Models/order.model';
import { OrderHistory } from '../Models/OrderHistory.model';
import { OrderService } from '../Sevices/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  orderHistory: OrderHistory[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderHistory = this.orderService.getOrderHistoryGen();
    console.log('Printing: ' + this.orderHistory);
  }

}
