package com.nagarro.service;

import java.util.List;

import com.nagarro.model.Address;

public interface AddressService {
	
	public Address addAddress(Address address);

	public List<Address> getAddress();
	
	
}
