package com.excelwireless.controller;


import com.excelwireless.bl.CustomerManager;
import com.excelwireless.dto.CustomerDto;
import com.excelwireless.dto.ProductEcomerceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@CrossOrigin(origins = {"*"})
public class CustomerController {

    @Autowired
    private CustomerManager customerManager;

    @RequestMapping(value = "/addCustomer", method = RequestMethod.POST, consumes = "application/json")
    public int addCustomer(@RequestBody CustomerDto customerDto) {
        return customerManager.addCustomerToDB(customerDto);
    }

    @RequestMapping(value = "/validateCustomer", method = RequestMethod.GET)
    public boolean validateCustomer(@RequestParam String phoneNo, @RequestParam String email) {

        return customerManager.validateCustomer(phoneNo, email);
    }

    @RequestMapping(value = "/updateCustomer", method = RequestMethod.POST, consumes = "application/json")
    public int updateCustomer(@RequestBody CustomerDto customerDto) {

        return customerManager.updateCustomerToDB(customerDto);
    }

//    @RequestMapping(value = "/sendEmail", method = RequestMethod.POST, consumes = "application/json")
//    public void sendEmail(@RequestBody CustomerDto customerDto) {
//        customerManager.sendEmail(customerDto);
//    }


}