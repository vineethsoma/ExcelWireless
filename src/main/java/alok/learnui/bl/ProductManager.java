package alok.learnui.bl;

import alok.learnui.dto.ProductEcomerceDto;
import alok.learnui.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.AbstractLobCreatingPreparedStatementCallback;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobCreator;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.PreparedStatement;
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
    JdbcTemplate jdbcTemplate;

    @Autowired
    SQLQueries sqlQueries;

    public List<ProductEcomerceDto> getProductDetails() {

        List<ProductEcomerceDto> productList = new ArrayList<>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductDetails,new ProductMapperForEcomerce());

            System.out.println("Send Product Details Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productList;
    }

    public List<ProductEcomerceDto> getEcommerceProductsByCategory(int category_Id) {

        List<ProductEcomerceDto> productList = new ArrayList<>();

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

    public List<ProductEcomerceDto> getProductForSearch() {

        List<ProductEcomerceDto> productList = new ArrayList<>();

        try
        {
            productList = jdbcTemplate.query(sqlQueries.getProductForSearch,new ProductMapperForProductSearch());

            System.out.println("Send Product Details by Category Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return productList;
    }


    private final class ProductMapperForEcomerce implements RowMapper<ProductEcomerceDto>
    {

        @Override
        public ProductEcomerceDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            ProductEcomerceDto product = new ProductEcomerceDto();

//            int blobLength = 0;
//
           int blobLength = (int)rs.getBlob("IMAGE").length();

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
            product.setAddTax(rs.getBoolean("TAX"));

            if(blobLength != 0) {
                product.setImage(rs.getBlob("IMAGE").getBytes(1, blobLength));
            }



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

        List<ProductEcomerceDto> productList = new ArrayList<>();

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

        int a = jdbcTemplate.update(sqlQueries.updateProductImage,new Object[]{lobValue, product_id}, new int[] {Types.BLOB, Types.INTEGER});

        System.out.println(a);


    }

}
