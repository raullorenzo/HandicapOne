package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.sql.DataSource;
import javax.ws.rs.Path;

import java.util.UUID;
import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.ForbiddenException;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.imageio.ImageIO;
import javax.ws.rs.core.Application;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.core.Context;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Comentario;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.ComentarioCollection;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Favorito;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.FavoritoCollection;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Partido;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.PartidoCollection;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Pick;

@Path("/comentarios")
public class ComentarioResource {
	@Context
	private SecurityContext security;
	private DataSource ds = DataSourceSPA.getInstance().getDataSource();

	private String GET_PARTIDO_BY_ID_QUERY = "select c.* from comentarios c where c.idcomentario=?";
	private String INSERT_COMENTARIO_QUERY = "insert into comentarios (pick, username, texto) values (?, ?, ?)";
	private String DELETE_PARTIDO_QUERY = "delete from comentarios where idcomentario=?";
	private String UPDATE_PARTIDO_QUERY = "update comentarios set username=ifnull(?,username),local=ifnull(?, local), visitante=ifnull(?, visitante),fechacierre=ifnull(?,fechacierre),fechapartido=ifnull(?,fechapartido) where idpartido=?";

	private String GET_PARTIDOS_QUERY = "select c.* from comentarios c where c.creation_timestamp < ifnull(?, now())  order by creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY_FROM_LAST = "select c.* from comentarios c where c.creation_timestamp > ? order by creation_timestamp desc";
	private String GET_PARTIDOS_QUERY_VAL = "select p.* from partidos p where p.validado=0 and p.creation_timestamp < ifnull(?, now())  order by creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY_FROM_LAST_VAL = "select p.* from partidos p where p.validado=0 and p.creation_timestamp > ? order by creation_timestamp desc";
	private String GET_PICKS_FROM_PARTIDO="select p.* from picks p, rel_partidopick pp where p.idpick= pp.idpick and pp.idpartido = ?   order by last_modified desc";
	private String GET_COMENTARIOS="select * from comentarios where pick=?";

	
	

	/**
	 * M�todo getPartidos
	 * M�todo en el que se recupera la lista de partidos siempre y cuando hayan partidos disponibles.
	 * Si la lista est� vac�a se deber� mostrar un mensaje
	 * @param length
	 * @param before
	 * @param after
	 * @return
	 */
	@GET
	@Produces(MediaType.PARTIDOS_API_PARTIDO_COLLECTION)
	public ComentarioCollection getComentarios(@QueryParam("length") int length,
			@QueryParam("before") long before, @QueryParam("after") long after) {
		ComentarioCollection comentarios = new ComentarioCollection();
		boolean datos=false;
		
		

		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			boolean updateFromLast = after > 0;// actualizamos si after es mayor
												// que cero
			stmt = updateFromLast ? conn
					.prepareStatement(GET_PARTIDOS_QUERY_FROM_LAST) : conn // operador
																			// terciario
																			// si
																			// es
																			// true
																			// ejecuta
																			// una
																			// cosa
																			// si
																			// es
																			// false,
																			// otra
					.prepareStatement(GET_PARTIDOS_QUERY);
			if (updateFromLast) {
				stmt.setTimestamp(1, new Timestamp(after));

			} else {
				if (before > 0)
					stmt.setTimestamp(1, new Timestamp(before));
				else
					stmt.setTimestamp(1, null);
				length = (length <= 0) ? 30 : length;// si length es negativo o
														// 0 el valor es 5 sino
														// el que te pasen.
				stmt.setInt(2, length);
			}
			ResultSet rs = stmt.executeQuery();  
			System.out.println(stmt);
			boolean first = true;
			long oldestTimestamp = 0;
			while (rs.next()) {
				datos=true;
				Comentario comentario = new Comentario();
				
				comentario.setIdcomentario(rs.getInt("idcomentario"));
				comentario.setPick(rs.getInt("pick"));
				comentario.setUsername(rs.getString("username"));
				comentario.setTexto(rs.getString("texto"));
				
				comentario.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				comentario.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
				oldestTimestamp = rs.getTimestamp("creation_timestamp")
						.getTime();
				comentario.setLast_modified(oldestTimestamp);
				if (first) {
					first = false;
					comentarios.setNewestTimestamp(comentario.getCreation_timestamp());
				}
				comentarios.addComentarios(comentario);
				
			}
			if(!datos){
				throw new ServerErrorException("La lista de partidos está vacía",
						Response.Status.INTERNAL_SERVER_ERROR);
			}
			comentarios.setOldestTimestamp(oldestTimestamp);
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

		return comentarios;
	}

	@GET
	 
	@Path("/picks/{pick}")
	@Produces(MediaType.FAVORITOS_API_FAVORITO_COLLECTION)
	public ComentarioCollection getComentarios(@PathParam("pick") String pick, @QueryParam("length") int length,
			@QueryParam("before") long before, @QueryParam("after") long after) {
		ComentarioCollection comentarios  = new ComentarioCollection();
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
			stmt = conn.prepareStatement(GET_COMENTARIOS);
			stmt.setString(1, String.valueOf(pick));
			ResultSet rs = stmt.executeQuery();
			boolean first = true;
			long oldestTimestamp = 0;
			
			while (rs.next()) {
				datos=true;
				
				Comentario comentario = new Comentario();
				
				comentario.setIdcomentario(rs.getInt("idcomentario"));
				comentario.setPick(rs.getInt("pick"));
				comentario.setUsername(rs.getString("username"));
				comentario.setTexto(rs.getString("texto"));
				
				comentario.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				comentario.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
				
				oldestTimestamp = rs.getTimestamp("creation_timestamp")
						.getTime();
				comentario.setLast_modified(oldestTimestamp);
				if (first) {
					first = false;
					
					comentarios.setNewestTimestamp(comentario.getCreation_timestamp());
				}
				
				
				comentarios.addComentarios(comentario);
			}
			
			if (!datos){
				throw new NotFoundException("No hay favoritos con nombre de usuario ="
						+ pick);
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
	
		return comentarios;
	}
	


	/**
	 * M�todo getPartido
	 * M�todo en el que se le pasa el idpartido y si existe retorna el objeto Partido asociado
	 * , en cambio si no existe lanza una NotFoundException con el mensaje: "There's no partido with idpartido= ?
	 * @param idpartido
	 * @param request
	 * @return
	 */
	@GET
	@Path("/{idcomentario}")
	@Produces(MediaType.PARTIDOS_API_PARTIDO)
	public Response getComentario(@PathParam("idcomentario") String idcomentario,
			@Context Request request) {
		// Create CacheControl
		CacheControl cc = new CacheControl();

		Comentario comentario = getComentarioFromDatabase(idcomentario);

		// Calculate the ETag on last modified date of user resource
		EntityTag eTag = new EntityTag(Long.toString(comentario.getLast_modified()));// etiqueta
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
		rb = Response.ok(comentario).cacheControl(cc).tag(eTag);// no coinciden y
																// creamos la
																// etiqueta

		return rb.build();

	}

	
	@DELETE
	@Path("/{idcomentario}")
	public String deleteComentario(@PathParam("idcomentario") String idcomentario) {
		Connection conn = null;
		System.out.println(idcomentario);
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(DELETE_PARTIDO_QUERY);
			stmt.setInt(1, Integer.valueOf(idcomentario));

			int rows = stmt.executeUpdate();
			if (rows == 0)
				throw new NotFoundException(
						"There's no partido with idpartido=" + idcomentario);  // da
																			// un
																			// errror
																			// especial
																			// si
																			// intentamos
																			// borrar
																			// algo
																			// que
																			// no
																			// exixte
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
		
		return "Comentario borrado!!";
	}


	


	
	//TODO No es necesario aunque se revisara
	/*private void validateUpdatePartido(Partido partido) {
		if (partido.getLocal() != null && partido.getLocal().length() > 100)
			throw new BadRequestException(
					"Local can't be greater than 100 characters.");
		if (partido.getVisitante() != null
				&& partido.getVisitante().length() > 500)
			throw new BadRequestException(
					"Visitor can't be greater than 500 characters.");
	}*/
	////crear comentario
	
	/**
	 * M�todo createPartido
	 * M�todo en el que le pasamos el objeto Partido que queremos crear , si el usuario asociado existe 
	 * lo crear� correctamente, en cambio si este usuario no existe lanzar� una Excepci�n
	 * 
	 * @param partido
	 * @return Partido (Retorna el objeto Partido con el id generado)
	 */
	
	@POST
	@Consumes(MediaType.PARTIDOS_API_PARTIDO)
	@Produces(MediaType.PARTIDOS_API_PARTIDO)
	public Comentario createComentario(Comentario comentario) {
		//validatePick(pick);
		System.out.println("comentario1: "+comentario);
		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(INSERT_COMENTARIO_QUERY,
					Statement.RETURN_GENERATED_KEYS);// return devuelve el
														// primary key, este
														// sera el sitingId

			stmt.setInt(1, comentario.getPick());
			stmt.setString(2, comentario.getUsername());
			stmt.setString(3, comentario.getTexto());
			
			stmt.executeUpdate();
			ResultSet rs = stmt.getGeneratedKeys();// copiamos aqui el idpartido
			if (rs.next()) {
				int idcomentario = rs.getInt(1);// lo grabamo en idpartido

				comentario = getComentarioFromDatabase(Integer.toString(idcomentario));
				System.out.println("comentario2: "+comentario);
			}
			System.out.println("comentario3: "+comentario);
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
		System.out.println("comentario4: "+comentario);
		return comentario;
	}

	
	
	
	///////
	
	/**
	 * A Partir de un idPartido retorna toda la informaci�n de ese partido en el objeto Partido
	 *  si realmente existe en BDD sino retorna una NotFoundException con el mensaje: No existe un partido con idpartido=?
	 * @param idpartido
	 * @return Partido
	 */
	private Comentario getComentarioFromDatabase(String idcomentario) {
		Comentario comentario = new Comentario();

		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(GET_PARTIDO_BY_ID_QUERY);
			stmt.setInt(1, Integer.valueOf(idcomentario));
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				
				
				comentario.setIdcomentario(rs.getInt("idcomentario"));
				comentario.setPick(rs.getInt("pick"));
				comentario.setUsername(rs.getString("username"));
				comentario.setTexto(rs.getString("texto"));
				comentario.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				comentario.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
			} else {
				throw new NotFoundException(
						"There's no partido with idpartido= " + idcomentario);
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

		return comentario;
	}
	
	

	

	/*private void validateUser(String idpartido) {
		Partido partido = getPartidoFromDatabase(idpartido);
		String username = partido.getUsername();
		if (!security.getUserPrincipal().getName().equals(username))
			throw new ForbiddenException(
					"You are not allowed to modify this sting.");
	}
*/
	// /////////////////
}