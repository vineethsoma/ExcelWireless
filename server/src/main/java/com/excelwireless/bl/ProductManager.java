package com.excelwireless.bl;


import com.excelwireless.dto.ProductEcomerceDto;
import com.excelwireless.dto.ProductPriceByCustomerDto;
import com.excelwireless.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by asp5045 on 1/3/17.
 */
@Component
public class ProductManager {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private SQLQueries sqlQueries;

    public List<ProductEcomerceDto> getProductDetails() {

        List<ProductEcomerceDto> productList = new ArrayList<ProductEcomerceDto>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductDetails,new ProductMapperForEcomerce());

            System.out.println("Send Product Details by Category Successfully");
        }
        catch (Exception e)
        {
            e.printStackTrace();
            System.out.println(e);
        }
        return productList;
    }

    public List<ProductEcomerceDto> getEcommerceProductsByBrandAndCategoryId(int model_id, int categoryId) {

        List<ProductEcomerceDto> productList = new ArrayList<ProductEcomerceDto>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductDetailsByModelIdAndCategoryId,new ProductMapperForEcomerce(), model_id, categoryId);

            System.out.println("Send Product Details by ModelId and CategoryId Successfully");
        }
        catch (Exception e)
        {
            e.printStackTrace();
            System.out.println(e);
        }
        return productList;


    }


    public List<ProductEcomerceDto> getEcommerceProductsByCategory(int category_Id) {

        List<ProductEcomerceDto> productList = new ArrayList<ProductEcomerceDto>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductDetailsByCategoryId,new ProductMapperForEcomerce(),category_Id);

            System.out.println("Send Product Details by Category Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productList;
    }



    public List<ProductEcomerceDto> getProductForSearch(String searchInput) {

        List<ProductEcomerceDto> productList = new ArrayList<ProductEcomerceDto>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductForSearch, new ProductMapperForEcomerce(),searchInput, searchInput);

            System.out.println("Send Product Details by Search Input Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productList;
    }

    public List<ProductEcomerceDto> getProductsByDescription(String description) {

        List<ProductEcomerceDto> productList = new ArrayList<ProductEcomerceDto>();
        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductsByDescription,new ProductMapperForEcomerce(),description,description);

            System.out.println("Send Product Details by Description Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productList;
    }

    public List<ProductPriceByCustomerDto> getProductPriceForCustomer(String phoneNo) {

        List<ProductPriceByCustomerDto> productPriceByCustomerDtoList = new ArrayList<ProductPriceByCustomerDto>();

        try{
            productPriceByCustomerDtoList = jdbcTemplate.query(sqlQueries.getProductPriceDetailsByCustomer,new ProductPriceByCustomerMapper(), phoneNo);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productPriceByCustomerDtoList;
    }

    private final class ProductPriceByCustomerMapper implements RowMapper<ProductPriceByCustomerDto>
    {

        @Override
        public ProductPriceByCustomerDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            ProductPriceByCustomerDto product = new ProductPriceByCustomerDto();

            product.setProductNo(rs.getString("PRODUCT_NO"));
            product.setRetailPrice(rs.getDouble("RETAIL_PRICE"));

            return product;
        }
    }



    private final class ProductMapperForProductSearch implements RowMapper<ProductEcomerceDto>
    {

        @Override
        public ProductEcomerceDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            ProductEcomerceDto product = new ProductEcomerceDto();

            product.setProductNo(rs.getString("PRODUCT_NO"));
            product.setDescription(rs.getString("DESCRIPTION"));
            product.setCategoryId(rs.getInt("CATEGORY_ID"));
            product.setModelId(rs.getInt("MODEL_ID"));
            product.setBrandId(rs.getInt("BRAND_ID"));

            return product;
        }
    }
    public List<ProductEcomerceDto> getEcommerceProductsByBrand(int model_Id) {

        List<ProductEcomerceDto> productList = new ArrayList<ProductEcomerceDto>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductDetailsByModelId,new ProductMapperForEcomerce(),model_Id);

            System.out.println("Send Product Details by Model Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productList;
    }


    public void insertProductImage(int product_id, MultipartFile image_file) throws IOException {

        //final File image = new File(image_path);
//        final InputStream inputStream = new FileInputStream(image_path);

        LobHandler lobHandler = new DefaultLobHandler();

        //Here getting image as MultipartFile and then getting input stream of the file and then getting the size of the file.
        SqlLobValue lobValue = new SqlLobValue(image_file.getInputStream(), (int )image_file.getSize(), lobHandler);


        // DO NOT DELETE THIS --- >THIS LOGIC HELP TO ADD IMAGES FOR BRANDS
//        product_id = 18;
//        int a = jdbcTemplate.update(sqlQueries.updateBrandImage,new Object[]{lobValue, product_id}, new int[] {Types.BLOB, Types.INTEGER});



        int a = jdbcTemplate.update(sqlQueries.updateProductImage,new Object[]{lobValue, product_id}, new int[] {Types.BLOB, Types.INTEGER});

        System.out.println(a);


    }


    private final class ProductMapperForEcomerce implements RowMapper<ProductEcomerceDto>
    {

        @Override
        public ProductEcomerceDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            ProductEcomerceDto product = new ProductEcomerceDto();

            try {
                product.setProductId(rs.getInt("PRODUCT_ID"));
                product.setProductNo(rs.getString("PRODUCT_NO"));
                product.setDescription(rs.getString("DESCRIPTION"));
                product.setCategoryId(rs.getInt("CATEGORY_ID"));
                product.setModelId(rs.getInt("MODEL_ID"));
                product.setVendorId(rs.getInt("VENDOR_ID"));
                product.setBrandId(rs.getInt("BRAND_ID"));
                product.setCostPrice(rs.getDouble("COST_PRICE"));
                product.setRetailPrice(rs.getDouble("RETAIL_PRICE"));
                product.setQuantity(rs.getInt("QUANTITY"));



                int blobLength = (int) rs.getBlob("IMAGE").length();



                // product.setAddTax(rs.getBoolean("TAX"));

                if (blobLength != 0) {
                    product.setImage(rs.getBlob("IMAGE").getBytes(1, blobLength));
                }
            }
            catch (Exception e)
            {
                e.getStackTrace();
                System.out.println(product.getProductNo());
            }


            return product;
        }
    }

}