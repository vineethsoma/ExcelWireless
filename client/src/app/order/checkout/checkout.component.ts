import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  updateProductFromCart() {
    const phoneNo = 7707030801;
    const productNo = '88060852585559';
    const quantity = 5;
    this.orderService.updateProductFromCart(phoneNo, productNo, quantity);
  }

  deleteProductFromCart() {
    const phoneNo = 7707030801;
    const productNo = '88060852585559';

    this.orderService.deleteProductFromCart(phoneNo, productNo);
  }

}
