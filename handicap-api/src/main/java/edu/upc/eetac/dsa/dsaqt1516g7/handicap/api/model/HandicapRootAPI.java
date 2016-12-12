package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.List;

import javax.ws.rs.core.Link;
 


import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

//import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.FavoritoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.ComentarioResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PickResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PartidoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.HandicapRootAPIResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.UserResource;

public class HandicapRootAPI {
	@InjectLinks({
        @InjectLink(resource = HandicapRootAPIResource.class, style = Style.ABSOLUTE, rel = "self partidomark home", title = "Handicap Root API"),
        @InjectLink(resource = PartidoResource.class, style = Style.ABSOLUTE, rel = "collection", title = "Latest partidos", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION),
        @InjectLink(resource = PartidoResource.class, style = Style.ABSOLUTE, rel = "create-partido", title = "Create new Partido", type = MediaType.PARTIDOS_API_PARTIDO),
        @InjectLink(resource = ComentarioResource.class, style = Style.ABSOLUTE, rel = "comentarios", title = "Create new Comentario", type = MediaType.MENSAJES_API_MENSAJE_COLLECTION),
        @InjectLink(resource = ComentarioResource.class, style = Style.ABSOLUTE, rel = "create-comentario", title = "Create new Comentario", type = MediaType.MENSAJES_API_MENSAJE),
        @InjectLink(resource = PickResource.class, style = Style.ABSOLUTE, rel = "picks", title = "Create new Pick", type = MediaType.MENSAJES_API_MENSAJE_COLLECTION),
        @InjectLink(resource = PickResource.class, style = Style.ABSOLUTE, rel = "create-pick", title = "Create new Pick", type = MediaType.MENSAJES_API_MENSAJE),
        //@InjectLink(resource = FavoritoResource.class, style = Style.ABSOLUTE, rel = "favoritos", title = "Create new Favorito", type = MediaType.FAVORITOS_API_FAVORITO_COLLECTION),
       // @InjectLink(resource = FavoritoResource.class, style = Style.ABSOLUTE, rel = "create-favorito", title = "Create new Favorito", type = MediaType.FAVORITOS_API_FAVORITO),
        @InjectLink(resource = UserResource.class, style = Style.ABSOLUTE, rel = "login", title = "login", type = MediaType.PARTIDOS_API_USER, method = "login"),})
	
	private List<Link> links;

	public List<Link> getLinks() {
		return links;
	}

	public void setLinks(List<Link> links) {
		this.links = links;
	}

}
