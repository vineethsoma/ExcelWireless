import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from './customer.service';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  customerForm: FormGroup;
  customerDto: Customer;
  transactionLineItemDto: TransactionLineItem[];
  productPriceByCustomerDto: CustomerProductPrice[];

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'onlyFirstName': ['', Validators.required],
      'lastName': ['', Validators.required],
     'email': ['', [ Validators.required,
        Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]], // TODO - Need to fox this too .com is not validating
      'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // TODO - Need to fix this for phono no.
      'taxId': [''],
      'dateOfBirth': [''],
      'companyName': [''],
      'street': [''],
      'city': [''],
      'state': [''],
      'country': [''],
      'zipcode': ['']
    });
  }

  addCustomer(): void {
    this.customerService.addOrUpdateCustomer(this.customerForm.value);
    this.customerForm.reset();
  }
  customerLogin() {
    const username = 'alok';
    const password = 'alok';

    this.customerService.getCustomerDetails(username, password)
    .subscribe((cust: Customer) => {
      this.customerDto = cust;

      if (this.customerDto.validUser) {
          alert('right credintails');
          this.getTransactionDetails(this.customerDto.phoneNo);
          this.getProductPriceByCustomer(this.customerDto.phoneNo);
        } else {
          alert('Wrong credintails');
        }
      console.log('customer details', this.customerDto);
    });
  }

  getTransactionDetails(phoneNo: number) {
    this.customerService.getCustomerTransactionDetails(phoneNo)
    .subscribe((transactionLineItem: TransactionLineItem[]) => {
      this.transactionLineItemDto = transactionLineItem;
      console.log('Transaction Line Item Details', this.transactionLineItemDto);
    });
  }

  getProductPriceByCustomer(phoneNo: number) {
    this.customerService.getProductPriceByCustomer(phoneNo)
    .subscribe((productPrice: CustomerProductPrice[]) => {
      this.productPriceByCustomerDto = productPrice;
      console.log('Product Price by Customer', this.productPriceByCustomerDto);
    });

  }

}

export class Customer {
  phoneNo: number;
  onlyFirstName: string;
  lastName: string;
  companyName: string;
  email: any;
  taxId: any;
  dateOfBirth: any;
  street: any;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  storeCredit: any;
  password: any;
  createdDate: any;
  validUser: boolean;
}

export class TransactionLineItem {

  transactionCompId: number;
  addTax: Boolean;
  brandId: number;
  categoryId: number;
  vendorId: number;
  modelId: number;
  description: any;
  image: any;
  phoneNo: number;
  productNo: any;
  quantity: number;
  retailPrice: any;
  transactionDate: any;
  retailWithDis: any;
  totalProductPrice: any;
  totalProductPriceWithTax: any;
  discountPercentage: any;
  quantityForSell: number;
  costPrice: any;
  discount: any;
  transactionStatus: string;
}

export class CustomerProductPrice {
  productNo: any;
  retailPrice: any;
}
