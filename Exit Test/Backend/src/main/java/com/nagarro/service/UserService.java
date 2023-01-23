package com.nagarro.service;

import java.util.List;

import com.nagarro.model.Users;

public interface UserService {

	public Users addUser(Users user);

	public List<Users> getUsers();
}
