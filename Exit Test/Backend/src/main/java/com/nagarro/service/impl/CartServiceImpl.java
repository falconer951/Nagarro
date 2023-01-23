package com.nagarro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exception.ProductCustomException;
import com.nagarro.model.Cart;
import com.nagarro.repository.CartRepo;
import com.nagarro.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepo cartRepo;

	@Override
	public Cart addItem(Cart cart) {
		cartRepo.save(cart);
		return cart;
	}

	public List<Cart> getCart() {
		return cartRepo.findAll();
	}

	@Override
	public Cart updateCart(int orderid, int quant) {
		Cart existingCart=cartRepo.findById(orderid)
		.orElseThrow(() -> new ProductCustomException("Cart Item not found"));
		existingCart.setQuantity(quant);
		cartRepo.save(existingCart);
		
		return existingCart;
	}

	@Override
	public void deleteItem(int orderid) {
		cartRepo.deleteById(orderid);
		
	}

}
