package com.nagarro.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PlacedOrders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int placeId;
	private String productName;
	private int productId;
	private Double productPrice;
	private int quantity;
	private double totalPrice;
	private int orderId;
	private String datePlaced;
	private String orderStatus;
	private String vedorEmail;
	private String customerEmail;
	private String address;
	private String zipcode;
	private String phonenumber;
	
	public PlacedOrders() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PlacedOrders(int placeId, String productName, int productId, Double productPrice, int quantity,
			double totalPrice, int orderId, String vedorEmail, String customerEmail, String address, String zipcode,
			String phonenumber,String datePlaced,String orderStatus) {
		super();
		this.placeId = placeId;
		this.productName = productName;
		this.productId = productId;
		this.productPrice = productPrice;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.orderId = orderId;
		this.vedorEmail = vedorEmail;
		this.customerEmail = customerEmail;
		this.address = address;
		this.zipcode = zipcode;
		this.phonenumber = phonenumber;
		this.setDatePlaced(datePlaced);
		this.setOrderStatus(orderStatus);
	}
	public int getPlaceId() {
		return placeId;
	}
	public void setPlaceId(int placeId) {
		this.placeId = placeId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public Double getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(Double productPrice) {
		this.productPrice = productPrice;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public String getVedorEmail() {
		return vedorEmail;
	}
	public void setVedorEmail(String vedorEmail) {
		this.vedorEmail = vedorEmail;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public String getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getDatePlaced() {
		return datePlaced;
	}
	public void setDatePlaced(String datePlaced) {
		this.datePlaced = datePlaced;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	
	
}
