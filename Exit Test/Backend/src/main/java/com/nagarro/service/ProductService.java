package com.nagarro.service;

import java.util.List;

import com.nagarro.model.Products;

public interface ProductService {
	public Products addProduct(Products product);

	public List<Products> getProduct();
	
	public Products updateProduct(Products product);
	
}
