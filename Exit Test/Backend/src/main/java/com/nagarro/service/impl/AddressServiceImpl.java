package com.nagarro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.model.Address;
import com.nagarro.repository.AddressRepo;
import com.nagarro.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepo addRepo;
	
	
	public Address addAddress(Address address) {
		addRepo.save(address);
		return address;
	}


	@Override
	public List<Address> getAddress() {
		return addRepo.findAll();
	}

}
