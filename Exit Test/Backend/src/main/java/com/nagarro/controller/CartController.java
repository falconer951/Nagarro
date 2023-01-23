package com.nagarro.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.nagarro.model.Cart;
import com.nagarro.model.PlacedOrders;
import com.nagarro.service.CartService;
import com.nagarro.service.OrderService;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer")
public class CartController {


	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;

	@PostMapping("/addcart")
	public Cart addToCart(@RequestParam(name = WebConstants.PROD_PRICE) String price,
			@RequestParam(name = WebConstants.PROD_NAME) String productname,
			@RequestParam(name = WebConstants.VENDOR) String vendoremail,
			@RequestParam(name = WebConstants.PROD_DISCOUNT) String discount,
			@RequestParam(name = WebConstants.PROD_ID) String productid,
			@RequestParam(name = WebConstants.QUANTITY) String prodquant,
			@RequestParam(name = WebConstants.CUSTOMER) String customeremail) {
		try {
			Cart cart = new Cart();
			cart.setProductName(productname);
			cart.setProductId(Integer.parseInt(productid));
			cart.setProductPrice(Double.parseDouble(price));
			cart.setProductDiscount(Double.parseDouble(discount));
			cart.setQuantity(Integer.parseInt(prodquant));
			cart.setVendorEmail(vendoremail);
			cart.setCustomerEmail(customeremail);
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			Date d = new Date();
			String newDate=formatter.format(d);
			cart.setDateAdded(newDate);

			return this.cartService.addItem(cart);
		} catch (Exception e) {
			throw new ProductCustomException("Unable to save product details, please try again");
		}
	}

	@GetMapping("/getcart")
	public List<Cart> getCartItem(){
		return this.cartService.getCart();
	}
	
	@PutMapping("/updatecart")
	public Cart updateCart(@RequestParam(name = WebConstants.ORDER_ID) String orderid,
			@RequestParam(name = WebConstants.QUANTITY) String prodquant) {
		int id=Integer.parseInt(orderid);
		int quant=Integer.parseInt(prodquant);
		return this.cartService.updateCart(id,quant);
	}
	@DeleteMapping("/deletecart")
	public void deleteCart(@RequestParam(name = WebConstants.ORDER_ID) String orderid) {
		cartService.deleteItem(Integer.parseInt(orderid));
	}
	@PostMapping("/orders")
	public void placedOrders(@RequestParam(name=WebConstants.CUSTOMER) String customer,
			@RequestParam(name=WebConstants.TOTAL_PRICE) String price) {
		orderService.orderPlace(customer, price);
	}
	
	@GetMapping("/orderlist")
	public List<PlacedOrders> getOrders(){
		return orderService.getItems();
	}
	
	@DeleteMapping("/cancelorder")
	public void cancelOrders(@RequestParam(name=WebConstants.PLACE_ID) String placedid) {
		orderService.cancelOrder(Integer.parseInt(placedid));
		
	}

}
