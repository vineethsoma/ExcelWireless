package alok.learnui.controller;

import alok.learnui.bl.SalesManager;
import alok.learnui.dto.TransactionDto;
import alok.learnui.dto.TransactionLineItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public class SalesController {

    @Autowired
    SalesManager salesManager;

    @RequestMapping(value = "/addTransaction", method = RequestMethod.POST, consumes = "application/json")
    public void addTransactionToDB(@RequestBody TransactionDto transactionDto)
    {
        salesManager.addTransaction(transactionDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addTransactionLineItem", consumes = "application/json")
    public void addTransactionLineItem(@RequestBody List<TransactionLineItemDto> transactionLineItemDto, @RequestParam String phoneNo)
    {
        salesManager.addTransactionLineItemToDB(transactionLineItemDto, phoneNo);
    }
}
