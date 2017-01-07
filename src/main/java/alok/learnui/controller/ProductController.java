package alok.learnui.controller;

import alok.learnui.bl.ProductManager;
import alok.learnui.dto.ProductEcomerceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.List;

/**
 * Created by asp5045 on 1/3/17.
 */
@RestController
@RequestMapping("")
@CrossOrigin(origins = {"*"})
public class ProductController {

    @Autowired
    ProductManager productManager;

    @RequestMapping(value = "/getProductsByCategory", method = RequestMethod.GET)
    public List<ProductEcomerceDto> getProductsByCategory(@RequestParam int category_Id) {

        return productManager.getEcommerceProductsByCategory(category_Id);
    }

    @RequestMapping(value = "/getEcommerceProductsByBrand", method = RequestMethod.GET)
    public List<ProductEcomerceDto> getEcommerceProductsByBrand(@RequestParam int brand_Id, @RequestParam int model_Id) {

        return productManager.getEcommerceProductsByBrand(brand_Id,model_Id);
    }

    @RequestMapping(value = "/insertProductImage", method = RequestMethod.GET)
    public void insertProductImage(@RequestParam int product_Id, @RequestParam String image_Path) throws FileNotFoundException {

        productManager.insertProductImage(product_Id,image_Path);
    }


}
