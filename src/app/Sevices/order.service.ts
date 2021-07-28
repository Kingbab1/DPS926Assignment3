import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { menuItem } from '../Models/menuItem.model';
import { Order } from '../Models/order.model';
import { OrderHistory } from '../Models/OrderHistory.model';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private menuToppings: menuItem[] = [
    { price: 0, name: 'Vegetables', multipiler: 1.2, selected: false },
    { price: 0, name: 'Meat-Ball', multipiler: 1.4, selected: false },
    { price: 0, name: 'Pepperoni', multipiler: 1.6, selected: false },
    { price: 0, name: 'Mushroom', multipiler: 1.8, selected: false },
  ];

  private menuSize: menuItem[] = [
    { price: 20, name: 'Party', multipiler: 1, selected: false },
    { price: 18, name: 'Large', multipiler: 1, selected: false },
    { price: 15, name: 'Medium', multipiler: 1, selected: false },
    { price: 13, name: 'Small', multipiler: 1, selected: false },
  ];

  private orderHistory: Order[] = [];

  private currentOrder: Order[] = [];

  private orderHistoryGen: OrderHistory[] = [];

  private totalCost = 0;

  private totalNum = 0;

  private orderID = 0;

  private historyID = 0;

  constructor() {}

  getToppings() {
    return this.menuToppings;
  }

  calculatetotals() {
    this.totalCost = 0;
    this.totalNum = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.currentOrder.length; i++) {
      this.totalCost = this.totalCost + this.currentOrder[i].totalPrice;
      this.totalNum = this.totalNum + this.currentOrder[i].quantity;
    }
  }

  uselectAllCurrentOrders()
  {
    for(const i of this.currentOrder)
    {
      i.selected = false;
    }
  }

  getSizes() {
    return this.menuSize;
  }

  placeOrder() {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    for(const i of this.currentOrder)
    {
      i.time = dateTime;
      i.id = this.historyID++;
      this.orderHistory.push(i);
    }
    const tempHist: OrderHistory = {
      date: dateTime , totalPrice: this.totalCost, totalNumber: this.totalNum
    };
    this.orderHistoryGen.push(tempHist);
    this.currentOrder = [];
    this.calculatetotals();
  }

  getOrderHistoryGen()
  {
    return this.orderHistoryGen;
  }

  addToOrder(order) {
    order.id = this.orderID++;
    this.currentOrder.push(order);
    this.printCurrentOrder();
    this.calculatetotals();
  }

  getTotalCost() {
    return this.totalCost;
  }

  getTotalQuantity() {
    return this.totalNum;
  }

  getAllCurrentOrders() {
    return this.currentOrder;
  }

  getallOrderHistory() {
    return this.orderHistory;
  }

  printCurrentOrder() {
    console.log('printing');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.currentOrder.length; i++) {
      console.log(
        'Topping' +
          this.currentOrder[i].topping.name +
          ' Size: ' +
          this.currentOrder[i].size.name +
          ' Quantity: ' +
          this.currentOrder[i].quantity +
          ' Price: ' +
          this.currentOrder[i].price +
          ' Total Price: ' +
          this.currentOrder[i].totalPrice
      );
    }
  }

  deleteOrder(order) {
    const index = this.currentOrder.indexOf(order);
    this.currentOrder.splice(index, 1);
    this.calculatetotals();
    this.printCurrentOrder();
  }

  resetOrder() {
    this.currentOrder = [];
    this.calculatetotals();
  }
}
