package com.nagarro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.model.PlacedOrders;

@Repository
public interface OrdersRepo extends JpaRepository<PlacedOrders,Integer> {

}
