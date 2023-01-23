package com.nagarro.service;

import java.util.List;

import com.nagarro.model.PlacedOrders;

public interface OrderService {
	public void orderPlace(String customer,String vendor);

	public List<PlacedOrders> getItems();
	
	public void cancelOrder(int placedid);

	public PlacedOrders updateOrderStatus(int id, int status);
	
}
