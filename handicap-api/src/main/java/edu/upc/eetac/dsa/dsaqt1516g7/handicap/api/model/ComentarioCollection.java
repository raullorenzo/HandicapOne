package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;


import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Link;





import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.ComentarioResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PartidoResource;


public class ComentarioCollection {
	@InjectLinks({
		@InjectLink(resource = ComentarioResource.class, style = Style.ABSOLUTE, rel = "create-comentario", title = "Create comentario", type = MediaType.PARTIDOS_API_PARTIDO),
		@InjectLink(value = "/comentarios?before={before}", style = Style.ABSOLUTE, rel = "before", title = "Comentarios anteriores", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION, bindings = { @Binding(name = "before", value = "${instance.oldestTimestamp}") }),
		@InjectLink(value = "/comentarios?after={after}", style = Style.ABSOLUTE, rel = "after", title = "Comentarios nuevos", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION, bindings = { @Binding(name = "after", value = "${instance.newestTimestamp}") }) })
	
	private List<Link> links;
	private List<Comentario> comentarios;
	private long newestTimestamp;
	private long oldestTimestamp;
	private int primercomentario;
	private int ultimocomentario;
	
	
	
	public List<Link> getLinks() {
		return links;
	}
 
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	
	public int getPrimercomentario() {
		return primercomentario;
	}

	public void setPrimercomentario(int primercomentario) {
		this.primercomentario = primercomentario;
	}

	
	
	public List<Comentario> getComentarios() {
		return comentarios;
	}

	public void setComentarios(List<Comentario> comentarios) {
		this.comentarios = comentarios;
	}

	public int getUltimocomentario() {
		return ultimocomentario;
	}

	public void setUltimocomentario(int ultimocomentario) {
		this.ultimocomentario = ultimocomentario;
	}

	public void addComentarios(Comentario comentario){
		comentarios.add(comentario);
	}

		
	public ComentarioCollection() {
		super();
		comentarios = new ArrayList<>();
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

}