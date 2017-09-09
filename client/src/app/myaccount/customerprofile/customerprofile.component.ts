import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user.service";
import { Customer } from "../myaccount.component";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from "../customer.service";

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss']
})
export class CustomerprofileComponent implements OnInit {

  customer: Customer;
  customerProfileForm: FormGroup;

  constructor(private userService: UserService, private customerServcie: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getCustomerDetails();

    this.customerProfileForm = this.formBuilder.group({
      'firstName': [this.customer.firstName, Validators.required],
      'lastName': [this.customer.lastName, Validators.required],
     'email': [{value: this.customer.email,disabled: true}, [ Validators.required,
        Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]], // TODO - Need to fox this too .com is not validating
      'phoneNo': [this.customer.phoneNo,[Validators.required, Validators.pattern('^[0-9]+$')]], // TODO - Need to fix this for phono no.
      'taxId': [this.customer.taxId],
      'dateOfBirth': [this.customer.dateOfBirth],
      'companyName': [this.customer.companyName],
      'street': [this.customer.street],
      'city': [this.customer.city],
      'state': [this.customer.state],
      'country': [this.customer.country],
      'zipcode': [this.customer.zipCode]
    });

  }

  getCustomerDetails(){
    this.userService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {

        this.userService.getCustomerDetails()
        .subscribe((cust) =>{
          this.customer = cust;
          console.log('Custoemr Details', this.customer);
        });
  } 
    })
}

updateCustomerDetails(){


  this.customerServcie.updateCustomer(this.customerProfileForm.value);

  console.log('customer info', this.customerProfileForm.value)
  
}

  

}
