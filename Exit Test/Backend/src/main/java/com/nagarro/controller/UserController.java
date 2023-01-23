package com.nagarro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.model.Users;
import com.nagarro.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/users/register")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	
	@PostMapping
	@CrossOrigin("*")
	public Users createUser(@RequestBody Users user){
		return this.userService.addUser(user);
	}
	
	@GetMapping
	public List<Users> getUsers() {
		return this.userService.getUsers();
	}
}
