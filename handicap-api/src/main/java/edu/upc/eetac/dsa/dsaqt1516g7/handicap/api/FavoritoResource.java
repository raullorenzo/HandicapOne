package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.ws.rs.InternalServerErrorException;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.apache.commons.codec.digest.DigestUtils;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Favorito;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.FavoritoCollection;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Partido;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.PartidoCollection;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Roles;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.User;

@Path("/favoritos")
public class FavoritoResource {
	
	private Application app;
	private DataSource ds = DataSourceSPA.getInstance().getDataSource();
	
	private String GET_FAVORITO= "select * from favoritos where username=? and idpick=?";
	private final static String GET_FAVORITOS= "select * from favoritos where username=?";
	private final static String POST_FAVORITOS= "insert into favoritos (username, idpick) values (?, ?)";
	
	@GET
	@Path("/{username}/{idpick}")
	@Produces(MediaType.FAVORITOS_API_FAVORITO)
	public Response getFavorito(@PathParam("username") String username, @PathParam ("idpick") int idpick,
			@Context Request request) {
		// Create CacheControl
		CacheControl cc = new CacheControl();
		
		Favorito favorito = getFavoritoFromDatabase(username, idpick);

		// Calculate the ETag on last modified date of user resource
		EntityTag eTag = new EntityTag(Long.toString(favorito.getLast_modified()));// etiqueta
																					// q
																					// creo
																					// el
																					// servidor
																					// y
																					// la
																					// asocia
																					// al
																					// recurso
																					// (stingid)
																					// =>
																					// no
																					// enviar
																					// cosas
																					// q
																					// ya
																					// se
																					// saben
		// Si ahora alguien cambia algo del recurso, se cambia la etiqueta, el
		// servidor; si el cliente pide algo el servidor ve q no coinciden
		// etiquetas es decir la version esta desactualizada, devuelve lo que
		// pide el cliente y lo actualiza, el cliente tb actualiza lo que ya
		// tenia
		// Verify if it matched with etag available in http request
		// en este caso crea la etiqueta por el campo lastmidified sino esta ese
		// cambio....buscarse la vida para saber cuando se modifica!
		Response.ResponseBuilder rb = request.evaluatePreconditions(eTag);

		// If ETag matches the rb will be non-null;
		// Use the rb to return the response without any further processing
		if (rb != null) {// coinciden etiquetas
			return rb.cacheControl(cc).tag(eTag).build();
		}

		// If rb is null then either it is first time request; or resource is
		// modified
		// Get the updated representation and return with Etag attached to it
		rb = Response.ok(favorito).cacheControl(cc).tag(eTag);// no coinciden y
																// creamos la
																// etiqueta

		return rb.build();

	}
	
	//Posible Favoritos 
	@GET
	 
	@Path("/{username}")
	@Produces(MediaType.FAVORITOS_API_FAVORITO_COLLECTION)
	public FavoritoCollection getFavoritos(@PathParam("username") String username, @QueryParam("length") int length,
			@QueryParam("before") long before, @QueryParam("after") long after) {
		FavoritoCollection favoritos  = new FavoritoCollection();
		boolean datos=false;
		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException("Could not connect to the database",
					Response.Status.SERVICE_UNAVAILABLE);
		}
	 
		PreparedStatement stmt = null;
		
		
		try {
			stmt = conn.prepareStatement(GET_FAVORITOS);
			stmt.setString(1, String.valueOf(username));
			ResultSet rs = stmt.executeQuery();
			boolean first = true;
			long oldestTimestamp = 0;
			
			while (rs.next()) {
				datos=true;
				
				Favorito favorito = new Favorito();
				favorito.setUsername(rs.getString("username"));
				favorito.setIdpick(rs.getInt("idpick"));
				favorito.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				favorito.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
				
				oldestTimestamp = rs.getTimestamp("creation_timestamp")
						.getTime();
				favorito.setLast_modified(oldestTimestamp);
				if (first) {
					first = false;
					favoritos.setNewestTimestamp(favorito.getCreation_timestamp());
				}
				
				favoritos.addFavoritos(favorito);
			}
			
			if (!datos){
				throw new NotFoundException("No hay favoritos con nombre de usuario ="
						+ username);
			}
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.INTERNAL_SERVER_ERROR);
		} finally {
			try {
				if (stmt != null)
					stmt.close();
				conn.close();
			} catch (SQLException e) {
			}
		}
	
		return favoritos;
	}
	 @POST
		@Consumes(MediaType.FAVORITOS_API_FAVORITO)
		@Produces(MediaType.FAVORITOS_API_FAVORITO)
		public Favorito createFavorito(Favorito favorito) {
			//validatePartido();
			Connection conn = null;
			try {
				conn = ds.getConnection();
			} catch (SQLException e) {
				throw new ServerErrorException(e.getMessage(),
						Response.Status.SERVICE_UNAVAILABLE);
			}

			PreparedStatement stmt = null;
			try {
				stmt = conn.prepareStatement(POST_FAVORITOS,
						Statement.RETURN_GENERATED_KEYS);// return devuelve el
															// primary key, este
															// sera el sitingId
				System.out.println("holaassss");
				
				
				
				
			
				stmt.setString(1, favorito.getUsername());
				stmt.setInt(2, favorito.getIdpick());
				stmt.executeUpdate();
				ResultSet rs = stmt.getGeneratedKeys();
				if (rs.next()) {
					String username = rs.getString(1);
					
					int idpick = rs.getInt(2);// lo grabamo en idpartido
					favorito = getFavoritoFromDatabase(username, idpick);
				}

			} catch (SQLException e) {
				throw new ServerErrorException(e.getMessage(),
						Response.Status.INTERNAL_SERVER_ERROR);
			} finally {
				try {
					if (stmt != null)
						stmt.close();
					conn.close();
				} catch (SQLException e) {
					throw new ServerErrorException(e.getMessage(),
							Response.Status.SERVICE_UNAVAILABLE);
				}
			}

			return favorito;
		}
	 
	 private Favorito getFavoritoFromDatabase(String username, int idpick){
		 
		 Favorito favorito = new Favorito();
		 
		 Connection conn = null;
			try {
				conn = ds.getConnection();
			} catch (SQLException e) {
				throw new ServerErrorException(e.getMessage(),
						Response.Status.SERVICE_UNAVAILABLE);
			}

			PreparedStatement stmt = null;
			try {
				stmt = conn.prepareStatement(GET_FAVORITO);
				stmt.setString(1, String.valueOf(username));
				stmt.setInt(2, Integer.valueOf(idpick));
				ResultSet rs = stmt.executeQuery();
				if (rs.next()) {
					
					
					favorito.setUsername(rs.getString("username"));
					favorito.setIdpick(rs.getInt("idpick"));
					favorito.setLast_modified(rs.getTimestamp("last_modified")
							.getTime());
					favorito.setCreation_timestamp(rs.getTimestamp(
							"creation_timestamp").getTime());
				} else {
					throw new NotFoundException(
							"There's no favorito with username= " + username);
				}
			} catch (SQLException e) {
				throw new ServerErrorException(e.getMessage(),
						Response.Status.INTERNAL_SERVER_ERROR);
			} finally {
				try {
					if (stmt != null)
						stmt.close();
					conn.close();
				} catch (SQLException e) {
					throw new ServerErrorException(e.getMessage(),
							Response.Status.SERVICE_UNAVAILABLE);
				}
			}
		return favorito;
	 }
}
