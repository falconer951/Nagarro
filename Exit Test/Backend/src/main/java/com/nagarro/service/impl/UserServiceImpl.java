package com.nagarro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.nagarro.model.Users;
import com.nagarro.repository.UserRepo;
import com.nagarro.service.UserService;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepository;

	@Override
	public Users addUser(Users user) {
		userRepository.save(user);
		return user;
	}

	public List<Users> getUsers() {
		return userRepository.findAll();
	}
}
