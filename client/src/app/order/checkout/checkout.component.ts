import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { TransactionLineItem } from '../../myaccount/myaccount.component';
import { Transaction } from '../order.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  transactionDto: Transaction;
  selectedItemToDelete: TransactionLineItem;
  checkoutOptions: CheckoutOptions;
  constructor(private orderService: OrderService) { }

  // ngOnChange(){
  //   this.getTotal(this.transactionLineItemDto);
  // }

  updateCheckout(options: CheckoutOptions) {

  }

  ngOnInit() {
    this.getCheckoutDetails();
  }

  getCheckoutDetails() {
    this.orderService.getCustomerTransactionDetails(7707030801)
      .subscribe((lineItems) => {
        this.checkoutOptions = this.updateCheckoutOptions(lineItems);
      });
  }
  updateCheckoutOptions(lineItems: TransactionLineItem[]) {
    let totalQuantity = 0;
    let totalAmount = 0;
    lineItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalAmount += item.quantity * item.retailPrice;
    });
    return new CheckoutOptions({ lineItems: lineItems, totalQuantity: totalQuantity, totalAmount: totalAmount });
  }
  updateProductFromCart(lineItem: TransactionLineItem) {
    const phoneNo = 7707030801;
    // const productNo = '8809998255262';
    // const quantity = 5;
    this.orderService.updateProductFromCart(phoneNo, lineItem.productNo, lineItem.quantity)
      .subscribe(data => {
        console.log('Response After updating product from cart' + data);
        this.getCheckoutDetails();
      },
      error => {
        console.log(JSON.stringify(error.json()));
      })
      ;
    // this.checkoutOptions.lineItems.find((item) => item.productNo == lineItem.productNo)

  }
  deleteProductFromCart(lineItem: TransactionLineItem) {
      const phoneNo = 7707030801;
    //   const productNo = '88060852585559';

      this.orderService.deleteProductFromCart(phoneNo, this.selectedItemToDelete.productNo)
      .subscribe(data => {
        console.log('Response After deleting product from cart' + data);
        this.getCheckoutDetails();
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  getLineItem(lineItem: TransactionLineItem) {
    this.selectedItemToDelete = lineItem;
  }

}
class CheckoutOptions {
  lineItems: TransactionLineItem[] = [];
  totalQuantity;
  totalAmount;

  constructor(options?: CheckoutOptions) {
    if (!options) {
      this.lineItems = [];
      this.totalQuantity = 0;
      this.totalAmount = 0;
    }
    else {

    }
  }
}
