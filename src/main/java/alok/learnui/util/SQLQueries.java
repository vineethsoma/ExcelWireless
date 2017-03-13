package alok.learnui.util;

import org.springframework.stereotype.Component;

/**
 * Created by asp5045 on 5/9/16.
 */
@Component
public class SQLQueries {

    public String addCustomerQuery =
            "INSERT INTO customer " +
            "(" +
                    "FIRST_NAME," +
                    "LAST_NAME," +
                    "PHONE_NO," +
                    "EMAIL," +
                    "TAX_ID," +
                    "DATEOFBIRTH," +
                    "CUSTOMER_TYPE," +
                    "GENDER," +
                    "STREET," +
                    "CITY," +
                    "STATE," +
                    "COUNTRY," +
                    "ZIPCODE," +
                    "FAX," +
                    "CUSTOMER_CREATE_DATE," +
                    "COMPANY_NAME)" +
            " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


    //ADD TRANSACTION INTO DATABASE

    public String addWebTransaction =
            "INSERT INTO web_transaction(TRANSACTION_DATE," +
                    "TOTAL_AMOUNT," +
                    "TAX_AMOUNT," +
                    "DISCOUNT_AMOUNT," +
                    "SUBTOTAL," +
                    "TOTALQUANTITY," +
                    "CUSTOMER_PHONENO," +
                    "STATUS," +
                    "PREVIOUS_BALANCE, " +
                    "BALANCE, " +
                    "RECEIPT_NOTE," +
                    "FIRST_NAME_LAST_NAME) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    public String addTransactionLineItem =
            "INSERT INTO transaction_line_item " +
            "(TRANSACTION_COMP_ID," +
                    "DATE," +
                    "TRANSACTION_STATUS," +
                    "PRODUCT_NO," +
                    "QUANTITY," +
                    "RETAIL," +
                    "COST," +
                    "DISCOUNT," +
                    "DISCOUNT_PERCENTAGE," +
                    "RETAILWITHDISCOUNT," +
                    "TOTALPRODUCTPRICE," +
                    "TOTAL_PRODUCT_PRICE_WITH_TAX, " +
                    "IMEI_NO)" +
            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";



    public String addPhoneDetailsAsProduct =
            "INSERT INTO phone " +
                    "(PRODUCT_NO,IMEI_NO,COST,RETAIL,MARKUP,LAST_UPDATED_TIME) " +
                    "VALUES (?,?,?,?,?,?)";




    public String editCustomerQuery = "UPDATE customer" +
            " SET FIRST_NAME = ?,  " +
            "LAST_NAME = ?, " +
            "PHONE_NO = ?, " +
            "EMAIL = ?, " +
            "TAX_ID = ?,  " +
            "DATEOFBIRTH = ?," +
            "CUSTOMER_TYPE = ?, " +
            "GENDER = ?, " +
            " STREET = ?," +
            " CITY = ?, " +
            "STATE = ?, " +
            "COUNTRY = ?, " +
            "ZIPCODE = ?, " +
            "FAX = ?, " +
            "COMPANY_NAME = ? " +
            "WHERE CUSTOMER_ID = ? AND PHONE_NO = ?";


    public String updateProductQuantity =
            "UPDATE PRODUCT SET " +
                    "QUANTITY = ? " +
                    "WHERE PRODUCT_ID = ?";


    //SQL QUERY TO GET  DETAILS FROM DATABASE

    public String getProductDetails = "SELECT * FROM product";

    public String getModelDetails = "SELECT * FROM PRODUCT_MODEL WHERE ID = ? AND ID <> 'NULL' ";

   // ORDER BY DESCRIPTION

    public String getCustomerDetails = "SELECT * FROM customer ORDER BY FIRST_NAME";

    public String getCategoryDetails = "SELECT * FROM category ORDER BY CATEGORY_NAME";

    public String getBrandDetails = "SELECT * FROM brand ORDER BY BRAND_NAME";

    public String getUserDetails = "SELECT * FROM user ORDER BY USERNAME";




    //SQL QUERY TO DELETE FROM DATABASE


    public String deleteCustomer = "DELETE FROM customer WHERE CUSTOMER_ID = ?";







    public String getProductQuantity = "SELECT QUANTITY FROM PRODUCT WHERE PRODUCT_NO = ?";


    public String getCustomerBalance = "SELECT BALANCE FROM CUSTOMER WHERE PHONE_NO = ?";

    public String updateBalanceToCustomerProfile = "UPDATE CUSTOMER SET BALANCE = ?, BALANCE_LAST_UPDATE_DATE = ? WHERE PHONE_NO = ? ";


    //I need to for last 12 months but here i am not putting between date condition i need to fox it.
    public String getCustomersLast12MonthSpend = "SELECT sum(TOTAL_AMOUNT) TOTAL FROM transaction where CUSTOMER_PHONENO = ?";




    public String getProductId = "SELECT PRODUCT_ID FROM PRODUCT WHERE PRODUCT_NO = ?";


    public String deleteImeiDetailsFromPhone = "DELETE FROM PHONE WHERE ID = ? ";



    public String getModelDetailsForBrand = "SELECT distinct MODEL_ID FROM product WHERE BRAND_ID = ? AND MODEL_ID <> 'NULL' ";

    public String getProductDetailsByCategoryId = "SELECT * FROM product WHERE CATEGORY_ID = ?";

    public String getProductDetailsByModelId = "SELECT * FROM product WHERE MODEL_ID = ?";
    public String updateProductImage = "UPDATE product SET IMAGE = ? WHERE PRODUCT_ID = ?";
    public String getBrandDetailsForParts = "SELECT distinct p.BRAND_ID, b.BRAND_NAME FROM product p JOIN brand b on p.BRAND_ID = b.BRAND_ID where p.CATEGORY_ID = 14";
}
