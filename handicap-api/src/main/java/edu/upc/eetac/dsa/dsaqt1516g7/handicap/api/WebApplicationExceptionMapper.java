package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api;


import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.HandicapError;

@Provider
public class WebApplicationExceptionMapper implements ExceptionMapper<WebApplicationException> {
	
@Override
public Response toResponse(WebApplicationException exception) {
	
	HandicapError error = new HandicapError(
		exception.getResponse().getStatus(), exception.getMessage());
	return Response.status(error.getStatus()).entity(error)
		.type(MediaType.PARTIDOS_API_ERROR).build();
	}

}
