package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.List;

import javax.ws.rs.core.Link;

import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PartidoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PickResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;

public class Pick {
	@InjectLinks({
		@InjectLink(resource = PickResource.class, style = Style.ABSOLUTE, rel = "picks", title = "Latest Picks", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION),
		@InjectLink(resource = PickResource.class, style = Style.ABSOLUTE, rel = "self edit", title = "Pick", type = MediaType.PARTIDOS_API_PARTIDO, method = "getPick", bindings = @Binding(name = "idpick", value = "${instance.idpick}")) })
	
	private List<Link> links;
	private int idpick;
	private String partido;
	private String username;
	private String titulo;
	private int opciones_pick;
	private int ganado;
	private String texto;
	private long last_modified;
	private long creation_timestamp;



	
	public List<Link> getLinks() {
		return links;
	}
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	public int getIdpick() {
		return idpick;
	}
	public void setIdpick(int idpick) {
		this.idpick = idpick;
	}
	public String getPartido() {
		return partido;
	}
	public void setPartido(String partido) {
		this.partido = partido;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public int getOpciones_pick() {
		return opciones_pick;
	}
	public void setOpciones_pick(int opciones_pick) {
		this.opciones_pick = opciones_pick;
	}
	public int getGanado() {
		return ganado;
	}
	public void setGanado(int ganado) {
		this.ganado = ganado;
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