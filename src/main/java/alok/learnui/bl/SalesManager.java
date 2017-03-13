package alok.learnui.bl;

import alok.learnui.dto.TransactionDto;
import alok.learnui.dto.TransactionLineItemDto;
import alok.learnui.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by asp5045 on 6/12/16.
 */

@Component
public class SalesManager {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SQLQueries sqlQueries;

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
    public void addTransactionLineItemToDB(final List<TransactionLineItemDto> transactionLineItemDto, String phoneNo) {
            try {
                jdbcTemplate.batchUpdate(sqlQueries.addTransactionLineItem, new BatchPreparedStatementSetter() {



                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {

                        TransactionLineItemDto transactionLineItemDto1 = transactionLineItemDto.get(i);

                        ps.setInt(1, transactionLineItemDto1.getTransactionCompId());
                        ps.setString(2, transactionLineItemDto1.getTransactionDate());
                        ps.setString(3, transactionLineItemDto1.getTransactionStatus());
                        ps.setString(4, transactionLineItemDto1.getProductNumber());

                        int productQuantity = jdbcTemplate.queryForObject(sqlQueries.getProductQuantity, new Object[]{transactionLineItemDto1.getProductNumber()}, Integer.class);

                        ps.setInt(5, transactionLineItemDto1.getQuantity());

                        int transQuantity = transactionLineItemDto1.getQuantity();

                        //reducing quantity into Stock for transaction
                        productQuantity = productQuantity - transQuantity;

                        int productId = jdbcTemplate.queryForObject(sqlQueries.getProductId, new Object[]{transactionLineItemDto1.getProductNumber()}, Integer.class);

                        jdbcTemplate.update(sqlQueries.updateProductQuantity, productQuantity, productId);

                        //Here I am checking is this phone return or not and if yes then i need to add that phone back to inventory.
                        if (null != transactionLineItemDto1.getImeiNo() && (transactionLineItemDto1.getTransactionStatus().equals("r") || transactionLineItemDto1.getTransactionStatus().equals("p"))) {
                            try {
                                jdbcTemplate.update(sqlQueries.addPhoneDetailsAsProduct,
                                        transactionLineItemDto1.getProductNumber(),
                                        transactionLineItemDto1.getImeiNo(),
                                        Math.abs(transactionLineItemDto1.getCost()),
                                        Math.abs(transactionLineItemDto1.getRetail()),
                                        0,
                                        transactionLineItemDto1.getTransactionDate());

                                //jdbcTemplate.update(sqlQuery.updateProductQuantity, productQuantity + transQuantity * -1, productId);
                                System.out.println("This is Phone Return");
                                //System.out.println(Math.abs(transQuantity));
                            } catch (Exception e) {
                                System.out.println(e);
                            }

                        }

                        ps.setDouble(6, transactionLineItemDto1.getRetail());
                        ps.setDouble(7, transactionLineItemDto1.getCost());
                        ps.setDouble(8, transactionLineItemDto1.getDiscount());
                        ps.setDouble(9, transactionLineItemDto1.getDiscountPercentage());
                        ps.setDouble(10, transactionLineItemDto1.getRetailWithDis());
                        ps.setDouble(11, transactionLineItemDto1.getTotalProductPrice());
                        ps.setDouble(12, transactionLineItemDto1.getTotalProductPriceWithTax());
                        ps.setString(13, transactionLineItemDto1.getImeiNo());

                        //Checking is this product is phone,  product has phone id or not if yes then that means this is phone sale so i need to remove IMEI No form Phone Table
                        // And also need to check that it should be complete transaction not a return thats why i am checking the status FLAG.
                        if (transactionLineItemDto1.getPhoneId() != 0 && transactionLineItemDto1.getTransactionStatus().equals("c")) {
                            jdbcTemplate.update(sqlQueries.deleteImeiDetailsFromPhone, transactionLineItemDto1.getPhoneId());
                            System.out.println("This is phone sale: Delete IMEI Successfully!!" + transactionLineItemDto1.getImeiNo());
                        }
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
    }

}






