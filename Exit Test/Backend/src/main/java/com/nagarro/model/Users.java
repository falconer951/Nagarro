package com.nagarro.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int userId;
	@Column(name = "fullname")
	String fullname;
	
	@Column(name = "password")
	String password;
	
	@Column(name = "email")
	String email;
	
	@Column(name = "type")
	String type;

	public Users() {
		super();
	}

	public Users(String fullname, String password, String email, String type) {
		super();
		this.fullname = fullname;
		this.password = password;
		this.email = email;
		this.type = type;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
}
