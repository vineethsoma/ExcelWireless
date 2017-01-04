package alok.learnui.controller;

import alok.learnui.bl.ProductManager;
import alok.learnui.dto.ProductEcomerceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
