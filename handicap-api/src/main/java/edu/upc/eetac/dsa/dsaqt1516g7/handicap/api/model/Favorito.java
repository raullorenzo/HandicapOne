package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.List;

import javax.ws.rs.core.Link;

import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLinks;
import org.glassfish.jersey.linking.InjectLink.Style;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.FavoritoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;

public class Favorito {
	//@InjectLinks({
		//@InjectLink(resource = FavoritoResource.class, style = Style.ABSOLUTE, rel = "favoritos", title = "Latest Favoritos", type = MediaType.FAVORITOS_API_FAVORITO_COLLECTION),
		//@InjectLink(resource = FavoritoResource.class, style = Style.ABSOLUTE, rel = "self edit", title = "Favorito", type = MediaType.FAVORITOS_API_FAVORITO, method = "getFavorito") })
	
	private List<Link> links;
	private String username;
	private int idpick;
	private long last_modified;
	private long creation_timestamp;
	
	public List<Link> getLinks() {
		return links;
	}
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getIdpick() {
		return idpick;
	}
	public void setIdpick(int idpick) {
		this.idpick = idpick;
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
