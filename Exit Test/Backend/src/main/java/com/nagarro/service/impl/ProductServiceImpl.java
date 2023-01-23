package com.nagarro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.model.Products;
import com.nagarro.repository.ProductRepo;
import com.nagarro.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepo productRepository;

	public Products addProduct(Products product) {
		productRepository.save(product);
		return product;
	}

	public List<Products> getProduct() {
		return productRepository.findAll();
	}

	public Products updateProduct(Products product) {
		this.productRepository.save(product);
		return product;
	}


}
