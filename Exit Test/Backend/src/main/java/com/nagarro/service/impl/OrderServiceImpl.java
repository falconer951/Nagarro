package com.nagarro.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exception.ProductCustomException;
import com.nagarro.model.Address;
import com.nagarro.model.Cart;
import com.nagarro.model.PlacedOrders;
import com.nagarro.repository.AddressRepo;
import com.nagarro.repository.CartRepo;
import com.nagarro.repository.OrdersRepo;
import com.nagarro.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private CartRepo cartRepo;

	@Autowired
	private OrdersRepo orderRepo;

	@Autowired
	private AddressRepo addRepo;

	@Override
	public void orderPlace(String customer, String price) {
		List<Cart> cart = cartRepo.findAll();

		List<Address> address = addRepo.findAll();
		Address tempAdd = new Address();
		for (Address a : address) {
			if (a.getCustomerEmail().equals(customer)) {
				tempAdd.setAddress(a.getAddress());
				tempAdd.setZipcode(a.getZipcode());
				tempAdd.setPhonenumber(a.getPhonenumber());
			}
		}

		for (Cart c : cart) {
			if (c.getCustomerEmail().equals(customer)) {
				PlacedOrders p = new PlacedOrders();
				p.setAddress(tempAdd.getAddress());
				p.setCustomerEmail(customer);
				p.setProductId(c.getOrderId());
				p.setPhonenumber(tempAdd.getPhonenumber());
				p.setVedorEmail(c.getVendorEmail());
				p.setProductPrice(c.getProductPrice());
				p.setQuantity(c.getQuantity());
				double total_price = 0;
				total_price += (1 - (c.getProductDiscount() / 100)) * (c.getProductPrice() * c.getQuantity());
				p.setTotalPrice(total_price);
				p.setZipcode(tempAdd.getZipcode());
				p.setOrderId(c.getOrderId());
				p.setOrderStatus("Not Cofirmed Yet");
				SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
				Date d = new Date();
				String newDate=formatter.format(d);
				System.out.println(newDate);
				p.setDatePlaced(newDate);
				p.setProductName(c.getProductName());
				cartRepo.deleteById(c.getOrderId());
				orderRepo.save(p);
			}
			
		}
	}
	public List<PlacedOrders> getItems() {
		return orderRepo.findAll();
		}
	@Override
	public void cancelOrder(int placedid) {
		orderRepo.deleteById(placedid);
		
	}
	@Override
	public PlacedOrders updateOrderStatus(int id, int status) {
		PlacedOrders po = orderRepo.findById(id)
		.orElseThrow(() -> new ProductCustomException("Product Item not found"));
		if(status==1) {
			po.setOrderStatus("Confirmed");
		}
		else if(status==0) {
			po.setOrderStatus("Sorry Order Cancelled");
		}
		orderRepo.save(po);
		return po;
		
	}

}
