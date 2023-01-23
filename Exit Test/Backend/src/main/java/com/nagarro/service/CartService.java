package com.nagarro.service;

import java.util.List;

import com.nagarro.model.Cart;

public interface CartService {
	
	public Cart addItem(Cart cart);
	
	public List<Cart> getCart();

	public Cart updateCart(int orderid, int quant);
	
	public void deleteItem(int orderid);

}
