package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Link;




import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PartidoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;


public class PartidoCollection {
	@InjectLinks({
		@InjectLink(resource = PartidoResource.class, style = Style.ABSOLUTE, rel = "create-partido", title = "Create partido", type = MediaType.PARTIDOS_API_PARTIDO),
		@InjectLink(value = "/partidos?before={before}", style = Style.ABSOLUTE, rel = "before", title = "Partidos anteriores", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION, bindings = { @Binding(name = "before", value = "${instance.oldestTimestamp}") }),
		@InjectLink(value = "/partidos?after={after}", style = Style.ABSOLUTE, rel = "after", title = "Partidos nuevos", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION, bindings = { @Binding(name = "after", value = "${instance.newestTimestamp}") }) })
	private List<Link> links;
	private List<Partido> partidos;
	private long newestTimestamp;
	private long oldestTimestamp;
	private int primerpartido;
	private int ultimopartido;
	
	public List<Link> getLinks() {
		return links;
	}
 
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	
	public int getPrimerpartido() {
		return primerpartido;
	}

	public void setPrimerpartido(int primerpartido) {
		this.primerpartido = primerpartido;
	}

	public int getUltimopartido() {
		return ultimopartido;
	}

	public void setUltimopartido(int ultimopartido) {
		this.ultimopartido = ultimopartido;
	}
	
	public List<Partido> getPartidos() {
		return partidos;
	}

	public List<Partido> getPartido() {
		return partidos;
	}

	public void setPartidos(List<Partido> partidos) {
		this.partidos = partidos;
	}
	
	public void getPartidos(List<Partido> partidos) {
		this.partidos = partidos;
	}
	
	public void addPartido(Partido partido){
		partidos.add(partido);
	}

		
	public PartidoCollection() {
		super();
		partidos = new ArrayList<>();
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