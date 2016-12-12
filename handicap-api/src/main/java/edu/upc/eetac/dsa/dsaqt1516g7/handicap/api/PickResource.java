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

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Partido;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.PartidoCollection;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.Pick;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.PickCollection;

@Path("/picks")
public class PickResource {
	@Context
	private SecurityContext security;
	private DataSource ds = DataSourceSPA.getInstance().getDataSource();

	private String GET_PICK_BY_ID_QUERY = "select p.* from picks p where p.idpick=?";
	private String INSERT_PICK_QUERY = "insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (?, ?, ?, ?, ?,?)";
	private String DELETE_PARTIDO_QUERY = "delete from picks where idpick=?";
	private String UPDATE_PARTIDO_QUERY = "update partidos set username=ifnull(?,username),local=ifnull(?, local), visitante=ifnull(?, visitante),fechacierre=ifnull(?,fechacierre),fechapartido=ifnull(?,fechapartido) where idpartido=?";

	private String GET_PARTIDOS_QUERY = "select p.* from picks p where p.creation_timestamp < ifnull(?, now())  order by creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY_FROM_LAST = "select p.* from picks p where p.creation_timestamp > ? order by creation_timestamp desc";
	private String GET_PARTIDOS_QUERY_VAL = "select p.* from partidos p where p.validado=0 and p.creation_timestamp < ifnull(?, now())  order by creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY_FROM_LAST_VAL = "select p.* from partidos p where p.validado=0 and p.creation_timestamp > ? order by creation_timestamp desc";
	private String GET_PICKS_FROM_PARTIDO="select p.* from picks p, partidos pp where p.partido= pp.idpartido and p.partido = ? order by last_modified asc";
	

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
	public PickCollection getPicks(@QueryParam("length") int length,
			@QueryParam("before") long before, @QueryParam("after") long after) {
		PickCollection picks = new PickCollection();
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
				length = (length <= 0) ? 10 : length;// si length es negativo o
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
				Pick pick = new Pick();
				pick.setIdpick(rs.getInt("idpick"));
				pick.setPartido(rs.getString("partido"));
				pick.setUsername(rs.getString("username"));
				pick.setTitulo(rs.getString("titulo"));
				pick.setOpciones_pick(rs.getInt("opciones_pick"));
				pick.setGanado(rs.getInt("ganado"));
				pick.setTexto(rs.getString("texto"));
				pick.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				pick.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
				pick.setLast_modified(oldestTimestamp);
				if (first) {
					first = false;
					picks.setNewestTimestamp(pick.getCreation_timestamp());
				}
				picks.addPick(pick);
			}
			if(!datos){
				throw new ServerErrorException("La lista de partidos está vacía",
						Response.Status.INTERNAL_SERVER_ERROR);
			}
			picks.setOldestTimestamp(oldestTimestamp);
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

		return picks;
	}
	  /////////////////////////////////////////////////
	 //buscamos los picks de un partido determinado///
	/////////////////////////////////////////////////
	
	@GET
	@Path("/partidos/{partido}")
	@Produces(MediaType.PARTIDOS_API_PARTIDO_COLLECTION)
	public PickCollection getPartido(@PathParam("partido") String partido) {
		PickCollection picks = new PickCollection();
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
			
			stmt = conn.prepareStatement(GET_PICKS_FROM_PARTIDO);
			stmt.setString(1, String.valueOf(partido));
			
			ResultSet rs = stmt.executeQuery();
			System.out.println(stmt);
			boolean first = true;
			long oldestTimestamp = 0;
			while (rs.next()) {
				datos=true;
				Pick pick = new Pick();
				pick.setIdpick(rs.getInt("idpick"));
				pick.setPartido(rs.getString("partido"));
				pick.setUsername(rs.getString("username"));
				pick.setTitulo(rs.getString("titulo"));
				pick.setOpciones_pick(rs.getInt("opciones_pick"));
				pick.setGanado(rs.getInt("ganado"));
				pick.setTexto(rs.getString("texto"));
				pick.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				pick.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
				pick.setLast_modified(oldestTimestamp);
				if (first) {
					first = false;
					picks.setNewestTimestamp(pick.getCreation_timestamp());
				}
				picks.addPick(pick);
			}
			if(!datos){
				throw new ServerErrorException("La lista de partidos está vacía",
						Response.Status.INTERNAL_SERVER_ERROR);
			}
			picks.setOldestTimestamp(oldestTimestamp);
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

		return picks;
	}
	


	//----------------------------------------------
	/**
	 * M�todo getPartido
	 * M�todo en el que se le pasa el idpartido y si existe retorna el objeto Partido asociado
	 * , en cambio si no existe lanza una NotFoundException con el mensaje: "There's no partido with idpartido= ?
	 * @param idpartido
	 * @param request
	 * @return
	 */
	@GET
	@Path("/{idpick}")
	@Produces(MediaType.PARTIDOS_API_PARTIDO)
	public Response getPick(@PathParam("idpick") String idpick,
			@Context Request request) {
		// Create CacheControl
		CacheControl cc = new CacheControl();

		Pick pick = getPickFromDatabase(idpick);

		// Calculate the ETag on last modified date of user resource
		EntityTag eTag = new EntityTag(Long.toString(pick.getLast_modified()));// etiqueta
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
		rb = Response.ok(pick).cacheControl(cc).tag(eTag);// no coinciden y
																// creamos la
																// etiqueta

		return rb.build();

	}

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
	public Pick createPick(Pick pick) {
		validatePick(pick);
		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(INSERT_PICK_QUERY,
					Statement.RETURN_GENERATED_KEYS);// return devuelve el
														// primary key, este
														// sera el sitingId

			stmt.setString(1, pick.getPartido());
			stmt.setString(2, pick.getUsername());
			stmt.setString(3, pick.getTitulo());
			stmt.setInt(4, pick.getOpciones_pick());
			stmt.setInt(5, pick.getGanado());
			stmt.setString(6, pick.getTexto());
			stmt.executeUpdate();
			ResultSet rs = stmt.getGeneratedKeys();// copiamos aqui el idpartido
			if (rs.next()) {
				int idpick = rs.getInt(1);// lo grabamo en idpartido

				pick = getPickFromDatabase(Integer.toString(idpick));
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

		return pick;
	}

	
	/**
	 * Método deletePartido
	 * Método en el que se le pasa un idPartido y si este existe se elimina de BDD si no existe lanza una 
	 * NotFoundException con el siguiente mensaje: There's no partido with idpartido=?
	 * @param idpartido
	 * @return String (Devuelve el mensaje de que se ha eliminado correctamente)
	 */
	@DELETE
	@Path("/{idpick}")
	public String deletePartido(@PathParam("idpick") String idpick) {
		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(DELETE_PARTIDO_QUERY);
			stmt.setInt(1, Integer.valueOf(idpick));

			int rows = stmt.executeUpdate();
			if (rows == 0)
				throw new NotFoundException(
						"There's no partido with idpartido=" + idpick);// da
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
		
		return "Partido correctly deleted";
	}

	
	/**
	 * Método updatePartido
	 * método en el que se le pasa como parametro el id del partido que queremos actualizar y un objeto partido
	 * con los campos que se quieren actualizar. Si ese partido existe se realiza la actualización de los campos
	 * oportunos y sino se lanza una NotFoundException con el siguiente mensaje: No hay un partido con idpartido=?
	 * @param idpartido
	 * @param partido
	 * @return Partido 
	 */
	@PUT
	@Path("/{idpick}")
	@Consumes(MediaType.PARTIDOS_API_PARTIDO)
	@Produces(MediaType.PARTIDOS_API_PARTIDO)
	public Pick updatePick(@PathParam("idpick") String idpick,
			Pick pick) {


		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {

			// if (song_name != null) {
			stmt = conn.prepareStatement(UPDATE_PARTIDO_QUERY);
			stmt.setString(1, pick.getPartido());
			stmt.setString(2, pick.getUsername());
			stmt.setString(3, pick.getTitulo());
			stmt.setInt(4, pick.getOpciones_pick());
			stmt.setInt(5, pick.getGanado());
			stmt.setString(6, pick.getTexto());
			stmt.setString(7, idpick);


			int rows = stmt.executeUpdate(); // para añadir con los datos de la
												// BBDD
			System.out.println("Query salida: " + stmt);

			if (rows == 0) {
				throw new NotFoundException("There's no partido with idpartido="
						+ idpick);
			} else {
				System.out.println("partido actualizado");

			}

			//Recuperamos el partido para ver que se han actualizado los campos de manera correcta
			pick = getPickFromDatabase(idpick);

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
						Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
		return pick;

	}

	
	/**
	 * M�todo al que se le pasa un objeto Partido 
	 * para validar que el partido creado debe tener obligatoriamente el equipo local y visitante informado
	 * y que tienen un limite de longitud de caracteres. Si esto no se cumple lanza un BadRequestException
	 * con el motivo
	 * @param partido
	 */
	private void validatePick(Pick pick) {
		//if (pick.getOpciones_pick() == null)
		if (pick.getOpciones_pick() > 5)
			throw new BadRequestException("The local team can't be null.");
		if (pick.getTexto() == null)
			throw new BadRequestException("The visitor team can't be null.");
		if (pick.getUsername().length() > 20)
			throw new BadRequestException(
					"local can't be greater than 100 characters.");
		if (pick.getTexto().length() > 2000)
			throw new BadRequestException(
					"visit can't be greater than 500 characters.");
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

	
	/**
	 * A Partir de un idPartido retorna toda la informaci�n de ese partido en el objeto Partido
	 *  si realmente existe en BDD sino retorna una NotFoundException con el mensaje: No existe un partido con idpartido=?
	 * @param idpartido
	 * @return Partido
	 */
	private Pick getPickFromDatabase(String idpick) {
		Pick pick = new Pick();

		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(GET_PICK_BY_ID_QUERY);
			stmt.setInt(1, Integer.valueOf(idpick));
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				
				
				pick.setIdpick(rs.getInt("idpick"));
				pick.setPartido(rs.getString("partido"));
				pick.setUsername(rs.getString("username"));
				pick.setTitulo(rs.getString("titulo"));
				pick.setOpciones_pick(rs.getInt("opciones_pick"));
				pick.setTexto(rs.getString("texto"));
				pick.setGanado(rs.getInt("ganado"));
				pick.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				pick.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
			} else {
				throw new NotFoundException(
						"There's no partido with idpartido= " + idpick);
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

		return pick;
	}
	
	

	

	/*private void validateUser(String idpartido) {
		Partido partido = getPartidoFromDatabase(idpartido);
		String username = partido.getUsername();
		if (!security.getUserPrincipal().getName().equals(username))
			throw new ForbiddenException(
					"You are not allowed to modify this sting.");
	}*/

	// /////////////////
}