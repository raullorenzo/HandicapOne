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
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model.equipo;

@Path("/partidos")
public class PartidoResource {
	@Context
	private Application app;
	@Context
	private SecurityContext security;
	private DataSource ds = DataSourceSPA.getInstance().getDataSource();

	
	private String GET_PARTIDO_BY_ID_QUERY = "select p.* from partidos p where p.idpartido=?";
	private String INSERT_PARTIDO_QUERY = "insert into partidos (imagenl, imagenv, versus, local, visitante,jornada, fechapartido, puntuacionl, puntuacionv, lugar) values (?, ?, ?, ?, ?, ?, ?,?,?,?)";
	private String DELETE_PARTIDO_QUERY = "delete from partidos where idpartido=?";
	private String UPDATE_PARTIDO_QUERY = "update partidos set local=ifnull(?,local),visitante=ifnull(?, visitante), jornada=ifnull(?, jornada),fechapartido=ifnull(?,fechapartido),puntuacionl=ifnull(?,puntuacionl),puntuacionv=ifnull(?,puntuacionv),lugar=ifnull(?,lugar),imagenl=ifnull(?,imagenl),imagenv=ifnull(?,imagenv),versus=ifnull(?,versus) where idpartido=?";
	private String GET_PARTIDOS_BY_USERNAME= "select * from partidos where username=? and creation_timestamp < ifnull(?, now()) ORDER BY creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY = "select p.* from partidos p where p.creation_timestamp < ifnull(?, now())  order by creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY2 = "select p.* from partidos p where p.creation_timestamp < ifnull(?, now())  order by jornada desc limit ?";

	private String GET_PARTIDOS_QUERY_FROM_LAST = "select p.* from partidos p where p.creation_timestamp > ? order by creation_timestamp desc";
	private String GET_PARTIDOS_QUERY_FROM_LAST2 = "select p.* from partidos p where p.creation_timestamp > ? order by jornada desc";

	private String GET_PARTIDOS_QUERY_VAL = "select p.* from partidos p where p.validado=0 and p.creation_timestamp < ifnull(?, now())  order by creation_timestamp desc limit ?";
	private String GET_PARTIDOS_QUERY_FROM_LAST_VAL = "select p.* from partidos p where p.validado=0 and p.creation_timestamp > ? order by creation_timestamp desc";
	private String GET_PICKS_FROM_PARTIDO="select p.* from picks p, rel_partidopick pp where p.idpick= pp.idpick and pp.idpartido = ?   order by last_modified desc";
	private String GET_EQUIPO_BY_ID_QUERY="SELECT filename FROM equipos where nombre=?";

	
	

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
	public PartidoCollection getPartidos(@QueryParam("length") int length,
			@QueryParam("before") long before, @QueryParam("after") long after) {
		PartidoCollection partidos = new PartidoCollection();
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
				length = (length <= 0) ? 5 : length;// si length es negativo o
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
				Partido partido = new Partido();
				partido.setIdpartido(rs.getInt("idpartido"));
				partido.setFilename1(rs.getString("imagenl") );	//HE tenido que quitar el + ".png"	pq sino los partidos creados no cargaban imagen, pero ahora los pre cargados no salen					
				partido.setImageURL1(app.getProperties().get("imgBaseURL")
						+ partido.getFilename1());
				partido.setFilename2(rs.getString("imagenv") );	//HE tenido que quitar el + ".png"	pq sino los partidos creados no cargaban imagen, pero ahora los pre cargados no salen		
				partido.setImageURL2(app.getProperties().get("imgBaseURL")
						+ partido.getFilename2());
				partido.setFilename3(rs.getString("versus") + ".png");				
				partido.setImageURL3(app.getProperties().get("imgBaseURL")
						+ partido.getFilename3());
				partido.setE_local(rs.getString("local"));
				partido.setE_visitante(rs.getString("visitante"));
				partido.setJornada(rs.getInt("jornada"));
				partido.setFechapartido(rs.getString("fechapartido"));
				partido.setPuntuacionl(rs.getInt("puntuacionl"));
				partido.setPuntuacionv(rs.getInt("puntuacionv"));
				partido.setLugar(rs.getString("lugar"));
				partido.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				partido.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
				oldestTimestamp = rs.getTimestamp("creation_timestamp")
						.getTime();
				partido.setLast_modified(oldestTimestamp);
				if (first) {
					first = false;
					partidos.setNewestTimestamp(partido.getCreation_timestamp());
				}
				partidos.addPartido(partido);
				
			}
			if(!datos){
				throw new ServerErrorException("La lista de partidos está vacía",
						Response.Status.INTERNAL_SERVER_ERROR);
			}
			partidos.setOldestTimestamp(oldestTimestamp);
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

		return partidos;
	}
	
	//crear partido
	
		@GET
		@Path("/team/{equipo}")
		@Produces(MediaType.PARTIDOS_API_PARTIDO)
		public Partido getEquipo(@PathParam("equipo") String equipo) {
			Partido partido = new Partido();
			
			Connection conn = null;
			try {
				conn = ds.getConnection();
			} catch (SQLException e) {
				throw new ServerErrorException("Could not connect to the database",
						Response.Status.SERVICE_UNAVAILABLE);
			}
		 
			PreparedStatement stmt = null;
			System.out.println(equipo);
			
			try {
				stmt = conn.prepareStatement(GET_EQUIPO_BY_ID_QUERY);
				stmt.setString(1, String.valueOf(equipo));
				System.out.println(stmt);
				ResultSet rs = stmt.executeQuery();
				if (rs.next()) {
					partido.setFilename1(rs.getString("filename") + ".png");				
					partido.setImageURL1(app.getProperties().get("imgBaseURL")
							+ partido.getFilename1());
				}
				else {
					throw new NotFoundException("No hay equipo con nombre="
							+ equipo);
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
			
			return partido;
		}
		
		
	//fin	


	/**
	 * M�todo getPartido
	 * M�todo en el que se le pasa el idpartido y si existe retorna el objeto Partido asociado
	 * , en cambio si no existe lanza una NotFoundException con el mensaje: "There's no partido with idpartido= ?
	 * @param idpartido
	 * @param request
	 * @return
	 */
	@GET
	@Path("/{idpartido}")
	@Produces(MediaType.PARTIDOS_API_PARTIDO)
	public Response getPartido(@PathParam("idpartido") String idpartido,
			@Context Request request) {
		// Create CacheControl
		CacheControl cc = new CacheControl();

		Partido partido = getPartidoFromDatabase(idpartido);

		// Calculate the ETag on last modified date of user resource
		EntityTag eTag = new EntityTag(Long.toString(partido.getLast_modified()));// etiqueta
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
		rb = Response.ok(partido).cacheControl(cc).tag(eTag);// no coinciden y
																// creamos la
																// etiqueta

		return rb.build();

	}
	
	//--------------
	
	//------------

	
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
	public Partido createPartido(Partido partido) {
		//validatePartido(partido);
		Connection conn = null;
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(INSERT_PARTIDO_QUERY,
					Statement.RETURN_GENERATED_KEYS);// return devuelve el
														// primary key, este
														// sera el sitingId
			System.out.println("holaassss");
			
			System.out.println(partido.getE_local());
			System.out.println(partido.getE_visitante());
			System.out.println(partido.getJornada());
			System.out.println(partido.getFechapartido());
			String fecha = "hola";
			
			stmt.setString(1, partido.getFilename1());
			stmt.setString(2, partido.getFilename2());
			stmt.setString(3, partido.getFilename3());
			stmt.setString(4, partido.getE_local());
			stmt.setString(5, partido.getE_visitante());
			stmt.setInt(6, partido.getJornada());
			stmt.setString(7, fecha);
			//stmt.setString(4, partido.getFechapartido());
			stmt.setInt(8, 0);
			stmt.setInt(9, 0);
			//stmt.setString(7, partido.getLugar());
			stmt.setString(10, partido.getE_local());
			stmt.executeUpdate();
			ResultSet rs = stmt.getGeneratedKeys();// copiamos aqui el idpartido
			if (rs.next()) {
				int idpartido = rs.getInt(1);// lo grabamo en idpartido
				partido = getPartidoFromDatabase(Integer.toString(idpartido));
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

		return partido;
	}

	
	/**
	 * M�todo deletePartido
	 * M�todo en el que se le pasa un idPartido y si este existe se elimina de BDD si no existe lanza una 
	 * NotFoundException con el siguiente mensaje: There's no partido with idpartido=?
	 * @param idpartido
	 * @return String (Devuelve el mensaje de que se ha eliminado correctamente)
	 */
	@DELETE
	@Path("/team/{idpartido}")
	public String deletePartido(@PathParam("idpartido") String idpartido) {
		Connection conn = null;
		System.out.println(idpartido);
		try {
			conn = ds.getConnection();
		} catch (SQLException e) {
			throw new ServerErrorException(e.getMessage(),
					Response.Status.SERVICE_UNAVAILABLE);
		}

		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(DELETE_PARTIDO_QUERY);
			stmt.setInt(1, Integer.valueOf(idpartido));

			int rows = stmt.executeUpdate();
			if (rows == 0)
				throw new NotFoundException(
						"There's no partido with idpartido=" + idpartido);  // da
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
	 * M�todo updatePartido
	 * m�todo en el que se le pasa como parametro el id del partido que queremos actualizar y un objeto partido
	 * con los campos que se quieren actualizar. Si ese partido existe se realiza la actualizaci�n de los campos
	 * oportunos y sino se lanza una NotFoundException con el siguiente mensaje: No hay un partido con idpartido=?
	 * @param idpartido
	 * @param partido
	 * @return Partido 
	 */
	@PUT
	@Path("/{idpartido}")
	@Consumes(MediaType.PARTIDOS_API_PARTIDO)
	@Produces(MediaType.PARTIDOS_API_PARTIDO)
	public Partido updatePartido(@PathParam("idpartido") String idpartido,
			Partido partido) {


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
			
			stmt.setString(1, partido.getE_local());
			stmt.setString(2, partido.getE_visitante());
			stmt.setInt(3, partido.getJornada());
			stmt.setString(4, partido.getFechapartido());
			stmt.setInt(5, partido.getPuntuacionl());
			stmt.setInt(6, partido.getPuntuacionv());
			stmt.setString(7, partido.getLugar());
			stmt.setString(8, partido.getFilename1());
			stmt.setString(9, partido.getFilename2());
			stmt.setString(10, partido.getFilename3());
			stmt.setString(11, idpartido);
			
			
		


			int rows = stmt.executeUpdate(); // para a�adir con los datos de la
												// BBDD
			System.out.println("Query salida: " + stmt);

			if (rows == 0) {
				throw new NotFoundException("There's no partido with idpartido="
						+ idpartido);
			} else {
				System.out.println("partido actualizado");

			}

			//Recuperamos el partido para ver que se han actualizado los campos de manera correcta
			partido = getPartidoFromDatabase(idpartido);

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
		return partido;
		

	}

	
	/**
	 * M�todo al que se le pasa un objeto Partido 
	 * para validar que el partido creado debe tener obligatoriamente el equipo local y visitante informado
	 * y que tienen un limite de longitud de caracteres. Si esto no se cumple lanza un BadRequestException
	 * con el motivo
	 * @param partido
	 */
	private void validatePartido(Partido partido) {
		if (partido.getE_local() == null)
			throw new BadRequestException("The local team can't be null.");
		if (partido.getE_visitante() == null)
			throw new BadRequestException("The visitor team can't be null.");
		if (partido.getE_local().length() > 100)
			throw new BadRequestException(
					"local can't be greater than 100 characters.");
		if (partido.getE_visitante().length() > 500)
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
	private Partido getPartidoFromDatabase(String idpartido) {
		Partido partido = new Partido();

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
			stmt.setInt(1, Integer.valueOf(idpartido));
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				
				
				partido.setIdpartido(rs.getInt("idpartido"));
				partido.setE_local(rs.getString("local"));
				partido.setE_visitante(rs.getString("visitante"));
				partido.setJornada(rs.getInt("jornada"));
				partido.setFechapartido(rs.getString("fechapartido"));
				partido.setPuntuacionl(rs.getInt("puntuacionl"));
				partido.setPuntuacionv(rs.getInt("puntuacionv"));
				partido.setLugar(rs.getString("lugar"));
				partido.setLast_modified(rs.getTimestamp("last_modified")
						.getTime());
				partido.setCreation_timestamp(rs.getTimestamp(
						"creation_timestamp").getTime());
			} else {
				throw new NotFoundException(
						"There's no partido with idpartido= " + idpartido);
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

		return partido;
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