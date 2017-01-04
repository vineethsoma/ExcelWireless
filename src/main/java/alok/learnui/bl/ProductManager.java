package alok.learnui.bl;

import alok.learnui.dto.ProductEcomerceDto;
import alok.learnui.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by asp5045 on 1/3/17.
 */
public class ProductManager {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SQLQueries sqlQueries;

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

    private final class ProductMapperForEcomerce implements RowMapper<ProductEcomerceDto>
    {

        @Override
        public ProductEcomerceDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            ProductEcomerceDto product = new ProductEcomerceDto();

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



            return product;
        }
    }

}
