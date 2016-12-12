package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.List;

import javax.ws.rs.core.Link;

import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.ComentarioResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PartidoResource;

public class Comentario {
	@InjectLinks({
		@InjectLink(resource = ComentarioResource.class, style = Style.ABSOLUTE, rel = "comentarios", title = "Latest Comentarios", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION),
		@InjectLink(resource = ComentarioResource.class, style = Style.ABSOLUTE, rel = "self edit", title = "Comentario", type = MediaType.PARTIDOS_API_PARTIDO, method = "getComentario", bindings = @Binding(name = "idcomentario", value = "${instance.idcomentario}")) })
	
	private List<Link> links;
	private int idcomentario;
	private int pick;
	private String username;
	private String texto;
	private long last_modified;
	private long creation_timestamp;
	
	
	public List<Link> getLinks() {
		return links;
	}
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	public int getIdcomentario() {
		return idcomentario;
	}
	public void setIdcomentario(int idcomentario) {
		this.idcomentario = idcomentario;
	}
	public int getPick() {
		return pick;
	}
	public void setPick(int pick) {
		this.pick = pick;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public long getLast_modified() {
		return last_modified;
	}
	public void setLast_modified(long last_modified) {
		this.last_modified = last_modified;
	}
	public long getCreation_timestamp() {
		return creation_timestamp;
	}
	public void setCreation_timestamp(long creation_timestamp) {
		this.creation_timestamp = creation_timestamp;
	}
	
	
	
}