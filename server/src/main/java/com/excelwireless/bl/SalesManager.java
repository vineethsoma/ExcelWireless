package com.excelwireless.bl;


import com.excelwireless.dto.TransactionDto;
import com.excelwireless.dto.TransactionLineItemDto;
import com.excelwireless.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by asp5045 on 6/12/16.
 */

@Component
public class SalesManager {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private SQLQueries sqlQueries;

    @Autowired
    CustomerManager customerManager;


    public void addTransaction(TransactionDto transactionDto) {

            try {
                        jdbcTemplate.update(sqlQueries.addWebTransaction,
                        transactionDto.getTransactionDate(),
                        transactionDto.getTotalAmount(),
                        transactionDto.getTax(),
                        transactionDto.getDiscount(),
                        transactionDto.getSubTotal(),
                        transactionDto.getTotalQuantity(),
                        transactionDto.getCustomerPhoneNo(),
                        transactionDto.getStatus(),
                        transactionDto.getPrevBalance(),
                        transactionDto.getBalance(),
                        transactionDto.getReceiptNote(),
                        transactionDto.getCustomerName());

                System.out.println("Web Transaction Added Successfully");

            } catch (Exception e) {

                System.out.println(e);
            }
    }
    public void addTransactionLineItemToDB(final TransactionLineItemDto transactionLineItemDto) {
            try {

                if(null != transactionLineItemDto) {

                    jdbcTemplate.update(sqlQueries.addSingleTransactionLineItem,
                            transactionLineItemDto.getPhoneNo(),
                            transactionLineItemDto.getTransactionDate(),
                            transactionLineItemDto.getProductNo(),
                            transactionLineItemDto.getQuantity(),
                            transactionLineItemDto.getRetailPrice(),
                            transactionLineItemDto.getCostPrice(),
                            transactionLineItemDto.getDiscount(),
                            transactionLineItemDto.getDiscountPercentage(),
                            transactionLineItemDto.getRetailWithDis(),
                            transactionLineItemDto.getTotalProductPrice(),
                            transactionLineItemDto.getTotalProductPriceWithTax(),
                            transactionLineItemDto.getImage());

                    System.out.println("Transaction Line Item Added Successfully");
                }

            } catch (Exception e) {
                System.out.println(e);
            }
    }

    public List<TransactionLineItemDto> getTransactionLineItemToDB(String phoneNo) {

        List<TransactionLineItemDto> transactionLineItemDtos = new ArrayList<TransactionLineItemDto>();

        transactionLineItemDtos = jdbcTemplate.query(sqlQueries.getTransactionLineItemDetails, new TransactionLineItemMapper(), phoneNo);


        return transactionLineItemDtos;
    }

    public boolean deleteTransactionLineItem(String phoneNo, String productNo) {

        int result = jdbcTemplate.update(sqlQueries.deleteProductFromCustomerOrder, phoneNo, productNo);

        return result == 1;
    }

    public boolean updateTransactionLineItem(String phoneNo, String productNo, int quantity) {

        int result = jdbcTemplate.update(sqlQueries.updateProductQuantity,quantity,phoneNo,productNo);
        return result ==1;

    }

    //THIS WILL GIVE LAST TRANSACTION COMP ID WHICH HELP UI TO GENERATE NEXT ID
    public int getLastTransactionId() {

        return jdbcTemplate.queryForObject(sqlQueries.getLastTransactionId, new Object[]{}, Integer.class);
    }

    public boolean checkoutTransactionLineItem(List<TransactionLineItemDto> transactionLineItemDto) {

        //THIS WILL GIVE LAST TRANSACTION COMP ID WHICH HELP UI TO GENERATE NEXT ID
//        int lastTransactionID = jdbcTemplate.queryForObject(sqlQueries.getLastTransactionId, new Object[]{}, Integer.class);
//        int finalTransactionId = lastTransactionID + 1;

        try {

            jdbcTemplate.batchUpdate(sqlQueries.addTransactionLineItem, new BatchPreparedStatementSetter() {

                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {

                    TransactionLineItemDto transactionLineItemDto1 = transactionLineItemDto.get(i);

                    ps.setInt(1,transactionLineItemDto1.getTransactionCompId());
                    ps.setString(2, transactionLineItemDto1.getTransactionDate());
                    ps.setString(3,"o");
                    ps.setString(4, transactionLineItemDto1.getProductNo());
                    ps.setInt(5, transactionLineItemDto1.getQuantity());
                    ps.setDouble(6, transactionLineItemDto1.getRetailPrice());
                    ps.setDouble(7, transactionLineItemDto1.getCostPrice());
                    ps.setDouble(8, transactionLineItemDto1.getDiscount());
                    ps.setDouble(9, transactionLineItemDto1.getDiscountPercentage());
                    ps.setDouble(10, transactionLineItemDto1.getRetailWithDis());
                    ps.setDouble(11, transactionLineItemDto1.getTotalProductPrice());
                    ps.setDouble(12, transactionLineItemDto1.getTotalProductPriceWithTax());
                }
                @Override
                public int getBatchSize() {
                    return transactionLineItemDto.size();
                }
            });
            System.out.println("Transaction Line Item Added Successfully");

        } catch (Exception e) {
            System.out.println(e);
        }

        return true;
    }

    public boolean checkoutTransaction(TransactionDto transactionDto) {
        try {
            jdbcTemplate.update(sqlQueries.addTransaction,
                    transactionDto.getTransactionCompId(),
                    transactionDto.getTransactionDate(),
                    transactionDto.getTotalAmount(),
                    transactionDto.getTax(),
                    transactionDto.getDiscount(),
                    transactionDto.getSubTotal(),
                    transactionDto.getTotalQuantity(),
                    transactionDto.getCustomerPhoneNo(),
                    transactionDto.getStatus(),
                    transactionDto.getPrevBalance(),
                    transactionDto.getBalance(),
                    transactionDto.getReceiptNote(),
                    transactionDto.getCustomerName());

            System.out.println("Transaction Added Successfully");

        } catch (Exception e) {

            System.out.println(e);
        }
        return true;
    }

    public boolean deleteTransactionLineItemsForFinalOrder(String customerPhoneNo) {

        int result = jdbcTemplate.update(sqlQueries.deleteAllTransactionLineItem,customerPhoneNo);

        System.out.println("Deleted all transaction line item from web transaction line item table successfully");

        return result != 0;
    }

    public List<TransactionDto> getSalesHistory(String phoneNo) {

        List<TransactionDto> transactionDto = new ArrayList<>();


        try {
            transactionDto = jdbcTemplate.query(sqlQueries.getTransactionDetails, new TransactionMappeOnlyForSalesHitsory(), phoneNo);

            System.out.println("Send Transaction Details Successfully");
        } catch (Exception e) {
            System.out.println(e);
        }

        return transactionDto;


    }

    public void addAllTransactionLineItemToDB(List<TransactionLineItemDto> lineItemDtoList) {

        try {

            jdbcTemplate.batchUpdate(sqlQueries.addSingleTransactionLineItem, new BatchPreparedStatementSetter() {

                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {

                    TransactionLineItemDto transactionLineItemDto1 = lineItemDtoList.get(i);

                    ps.setString(1, transactionLineItemDto1.getPhoneNo());
                    ps.setString(2, transactionLineItemDto1.getTransactionDate());
                    ps.setString(3, transactionLineItemDto1.getProductNo());
                    ps.setInt(4, transactionLineItemDto1.getQuantity());
                    ps.setDouble(5, transactionLineItemDto1.getRetailPrice());
                    ps.setDouble(6, transactionLineItemDto1.getCostPrice());
                    ps.setDouble(7, transactionLineItemDto1.getDiscount());
                    ps.setDouble(8, transactionLineItemDto1.getDiscountPercentage());
                    ps.setDouble(9, transactionLineItemDto1.getRetailWithDis());
                    ps.setDouble(10, transactionLineItemDto1.getTotalProductPrice());
                    ps.setDouble(11, transactionLineItemDto1.getTotalProductPriceWithTax());
                    ps.setBytes(12, transactionLineItemDto1.getImage());


                }
                @Override
                public int getBatchSize() {
                    return lineItemDtoList.size();
                }
            });
            System.out.println("All Transaction Line Item Added Successfully");

        } catch (Exception e) {
            System.out.println(e);
        }

    }




    private final class TransactionMappeOnlyForSalesHitsory implements RowMapper<TransactionDto> {

        @Override
        public TransactionDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            TransactionDto transaction = new TransactionDto();


            transaction.setTransactionCompId(rs.getInt("TRANSACTION_COMP_ID"));
            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date d = null;
            try {
                d = f.parse(rs.getString("TRANSACTION_DATE"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            DateFormat date = new SimpleDateFormat("MM/dd/yyyy");//NEED TO CHECK THIS
            DateFormat time = new SimpleDateFormat("hh:mm:ss");
            transaction.setTransactionDate(date.format(d));
            transaction.setTransactionTime(time.format(d));
            transaction.setTotalAmount(rs.getDouble("TOTAL_AMOUNT"));
            transaction.setTotalQuantity(rs.getInt("TOTALQUANTITY"));
            transaction.setTax(rs.getDouble("TAX_AMOUNT"));
            transaction.setDiscount(rs.getDouble("DISCOUNT_AMOUNT"));
            transaction.setSubTotal(rs.getDouble("SUBTOTAL"));
            transaction.setCustomerPhoneNo(rs.getString("CUSTOMER_PHONENO"));
            transaction.setCustomerName(rs.getString("FIRST_NAME_LAST_NAME"));
            transaction.setUsername(rs.getString("USERNAME"));
            transaction.setStatus(rs.getString("STATUS"));
            transaction.setReceiptNote(rs.getString("RECEIPT_NOTE"));
            transaction.setTransactionNote(rs.getString("TRANSACTION_NOTE"));
            return transaction;
        }
    }

    private final class TransactionLineItemMapper implements RowMapper<TransactionLineItemDto> {

        @Override
        public TransactionLineItemDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            TransactionLineItemDto lineItem = new TransactionLineItemDto();

            lineItem.setProductNo(rs.getString("PRODUCT_NO"));
            lineItem.setQuantity(rs.getInt("QUANTITY"));
            lineItem.setDescription(jdbcTemplate.queryForObject(sqlQueries.getProductDescription, new Object[]{lineItem.getProductNo()}, String.class));
            lineItem.setRetailPrice(rs.getDouble("RETAIL"));
            lineItem.setCostPrice(rs.getDouble("COST"));
            lineItem.setDiscount(rs.getDouble("DISCOUNT"));
            lineItem.setDiscountPercentage(rs.getDouble("DISCOUNT_PERCENTAGE"));
            lineItem.setRetailWithDis(rs.getDouble("RETAILWITHDISCOUNT"));
            lineItem.setTotalProductPrice(rs.getDouble("TOTALPRODUCTPRICE"));
            lineItem.setTotalProductPriceWithTax(rs.getDouble("TOTAL_PRODUCT_PRICE_WITH_TAX"));

            try{
                int blobLength = (int) rs.getBlob("IMAGE").length();
                if (blobLength != 0) {
                    lineItem.setImage(rs.getBlob("IMAGE").getBytes(1, blobLength));
                }
            }
            catch (Exception e)
            {
                System.out.println("Images is coming as null"+ e);
            }
            return lineItem;
        }
    }
}






