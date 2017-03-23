package alok.learnui.controller;

import alok.learnui.bl.ProductManager;
import alok.learnui.dto.ProductEcomerceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
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

    @RequestMapping(value = "/getProduct", method = RequestMethod.GET)
    public List<ProductEcomerceDto> getProduct() {

        return productManager.getProductDetails();
    }

    @RequestMapping(value = "/getProductForSearch", method = RequestMethod.GET)
    public List<ProductEcomerceDto> getProductForSearch() {

        return productManager.getProductForSearch();
    }
    @RequestMapping(value = "/getProductsByCategory", method = RequestMethod.GET)
    public List<ProductEcomerceDto> getProductsByCategory(@RequestParam int category_Id) {

        return productManager.getEcommerceProductsByCategory(category_Id);
    }

    @RequestMapping(value = "/getEcommerceProductsByModel", method = RequestMethod.GET)
    public List<ProductEcomerceDto> getEcommerceProductsByBrand(@RequestParam int model_Id) {

        return productManager.getEcommerceProductsByBrand(model_Id);
    }

    @RequestMapping(value = "/insertProductImage", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void insertProductImage(@RequestParam int product_Id, @RequestParam("file") MultipartFile file) throws IOException {

        System.out.println(file.getSize());

        productManager.insertProductImage(product_Id,file);
    }
//    @RequestMapping(value = "/getImage", method = RequestMethod.GET)
//    public ResponseEntity<?> getEcommerceProductsByBrand1(@RequestParam int model_Id) throws SQLException {
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//
//        httpHeaders.setContentType(MediaType.IMAGE_PNG);
//
//        int blobLength = (int)productManager.getEcommerceProductsByBrand(model_Id).get(0).getImage().length();
//        //httpHeaders.set("uuid","123");
//
//        return new ResponseEntity<>(productManager.getEcommerceProductsByBrand(model_Id).get(0).getImage().getBytes(1,blobLength),httpHeaders,HttpStatus.OK);
//    }


}
