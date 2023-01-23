package com.nagarro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.model.Address;

@Repository
public interface AddressRepo extends JpaRepository<Address,Long> {

}
