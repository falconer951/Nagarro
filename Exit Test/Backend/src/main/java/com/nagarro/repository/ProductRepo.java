package com.nagarro.repository;

//import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nagarro.model.Products;

@Repository
@Transactional
public interface ProductRepo extends JpaRepository<Products, Long> {

	void deleteByProductid(int productid);
	
	
}
