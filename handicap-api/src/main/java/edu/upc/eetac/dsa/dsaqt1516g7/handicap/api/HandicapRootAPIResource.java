package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.HandicapRootAPI;

@Path("/")
public class HandicapRootAPIResource {
	@GET
	public HandicapRootAPI getRootAPI() {
		HandicapRootAPI api = new HandicapRootAPI();
		return api;
	}
}
