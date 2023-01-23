package com.nagarro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.nagarro.constants.WebConstants;
import com.nagarro.exception.ProductCustomException;
import com.nagarro.model.PlacedOrders;
import com.nagarro.model.Products;
import com.nagarro.repository.ProductRepo;
import com.nagarro.service.OrderService;
import com.nagarro.service.ProductService;

@RestController
@CrossOrigin("*")
@RequestMapping("/vendor")
public class ProductController {
	
	@Autowired
	private OrderService orderService;

	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductRepo productRepo;

	@PostMapping("/products")
	public Products createProduct(@RequestParam(name = WebConstants.PROD_FILE, required = false) String prodImage,
			@RequestParam(name = WebConstants.PROD_DESC) String description,
			@RequestParam(name = WebConstants.PROD_PRICE) String price,
			@RequestParam(name = WebConstants.PROD_NAME) String productname,
			@RequestParam(name = WebConstants.VENDOR) String vendorname,
			@RequestParam(name = WebConstants.PROD_DISCOUNT) String discount) {
		try {
			Products prod=new Products();
			prod.setProductDesc(description);
			prod.setProductPrice(Double.parseDouble(price));
			prod.setProductDiscount(Double.parseDouble(discount));
			prod.setProductName(productname);
			prod.setVendorEmail(vendorname);
			if (prodImage != null) {
				prod.setProductimage(prodImage);
			}
			return this.productService.addProduct(prod);
		}
		catch (Exception e) {
			throw new ProductCustomException("Unable to save product details, please try again");
		}
	}
	
	@GetMapping("/products")
	public List<Products> getProduct(){
		return this.productService.getProduct();
		}
	
	@DeleteMapping("/products")
	public void deleteProduct(@RequestParam(name = WebConstants.PROD_ID) String productid){
		System.out.println(productid);
		productRepo.deleteByProductid(Integer.parseInt(productid));
	}
	
	@PutMapping("/products")
	public Products updateProduct(@RequestParam(name = WebConstants.PROD_DESC) String description,
			@RequestParam(name = WebConstants.PROD_FILE, required = false) String prodImage,
			@RequestParam(name = WebConstants.PROD_PRICE) String price,
			@RequestParam(name = WebConstants.PROD_NAME) String productname,
			@RequestParam(name = WebConstants.VENDOR) String vendorname,
			@RequestParam(name = WebConstants.PROD_ID) String productid,
			@RequestParam(name = WebConstants.PROD_DISCOUNT) String discount){
		Products prod = new Products(Integer.parseInt(productid),productname,
				Double.parseDouble(price), Double.parseDouble(discount),description,prodImage,vendorname);
		return this.productService.updateProduct(prod);
			}
	
	@PutMapping("/updatestatus")
	public PlacedOrders updateStatus(@RequestParam(name=WebConstants.PLACE_ID) String id,
			@RequestParam(name=WebConstants.STATUS) String status) {
		return orderService.updateOrderStatus(Integer.parseInt(id),Integer.parseInt(status));
		
	}
	
}
