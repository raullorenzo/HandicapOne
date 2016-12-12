package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

public class HandicapError {
	private int status;
	private String message;
 
	public HandicapError() {
		super();
	}
 
	public HandicapError(int status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
 
	public int getStatus() {
		return status;
	}
 
	public void setStatus(int status) {
		this.status = status;
	}
 
	public String getMessage() {
		return message;
	}
 
	public void setMessage(String message) {
		this.message = message;
	}

}