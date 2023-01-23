package com.nagarro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.constants.WebConstants;
import com.nagarro.exception.ProductCustomException;
import com.nagarro.model.Address;
import com.nagarro.service.AddressService;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/address")
public class AddressController {

	@Autowired
	private AddressService addressService;

	@PostMapping
	public Address addAddress(@RequestParam(name = WebConstants.ADDRESS) String address,
			@RequestParam(name = WebConstants.CITY) String city, @RequestParam(name = WebConstants.STATE) String state,
			@RequestParam(name = WebConstants.COUNTRY) String country,
			@RequestParam(name = WebConstants.ZIP) String zip, @RequestParam(name = WebConstants.PHONE) String phone,
			@RequestParam(name = WebConstants.CUSTOMER) String customerEmail) {
		try {
			Address add = new Address();
			add.setAddress(address);
			add.setCity(city);
			add.setState(state);
			add.setCountry(country);
			add.setPhonenumber(phone);
			add.setZipcode(zip);
			add.setCustomerEmail(customerEmail);
			return addressService.addAddress(add);
	
		} catch (Exception e) {
			throw new ProductCustomException("Unable to save address details, please try again");
		}
	}
	@GetMapping
	public List<Address> getAddress(){
		return addressService.getAddress();
	}

}
