import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../Sevices/order.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
  }

  checkCurrentOrderClicked(){
    this.router.navigate(['/check-order']);
  }

  updateOrderClicked(){
    this.router.navigate(['/update-order']);
  }

  historyClicked(){
    console.log('Console Clicked! ');
    this.router.navigate(['/history']);
  }

  newOrderClicked(){
      this.orderService.resetOrder();
      this.router.navigate(['/home']);
  }

}
