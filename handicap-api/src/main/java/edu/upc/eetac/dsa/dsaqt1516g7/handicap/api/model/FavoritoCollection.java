package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Link;

import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.FavoritoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;

public class FavoritoCollection {
	@InjectLinks({
		@InjectLink(resource = FavoritoResource.class, style = Style.ABSOLUTE, rel = "create-favorito", title = "Create favorito", type = MediaType.FAVORITOS_API_FAVORITO),
		@InjectLink(value = "/favoritos?before={before}", style = Style.ABSOLUTE, rel = "before", title = "Favoritos anteriores", type = MediaType.FAVORITOS_API_FAVORITO_COLLECTION, bindings = { @Binding(name = "before", value = "${instance.oldestTimestamp}") }),
		@InjectLink(value = "/favoritos?after={after}", style = Style.ABSOLUTE, rel = "after", title = "Favoritos nuevos", type = MediaType.FAVORITOS_API_FAVORITO_COLLECTION, bindings = { @Binding(name = "after", value = "${instance.newestTimestamp}") }) })
	private List<Link> links;
	private List<Favorito> favoritos;
	private long newestTimestamp;
	private long oldestTimestamp;
	
	public FavoritoCollection() {
		super();
		favoritos = new ArrayList<>();
	}
	
	public long getNewestTimestamp() {
		return newestTimestamp;
	}
	public void setNewestTimestamp(long newestTimestamp) {
		this.newestTimestamp = newestTimestamp;
	}
	public long getOldestTimestamp() {
		return oldestTimestamp;
	}
	public void setOldestTimestamp(long oldestTimestamp) {
		this.oldestTimestamp = oldestTimestamp;
	}
	public List<Link> getLinks() {
		return links;
	}
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	public List<Favorito> getFavoritos() {
		return favoritos;
	}
	public void setFavoritos(List<Favorito> favoritos) {
		this.favoritos = favoritos;
	}
	public void addFavoritos(Favorito favorito){
		favoritos.add(favorito);
	}
}
