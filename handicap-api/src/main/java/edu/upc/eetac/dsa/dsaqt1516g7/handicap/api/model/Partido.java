package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.model;

import java.util.List;

import javax.ws.rs.core.Link;
 
import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PartidoResource;
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.MediaType;
public class Partido {
	@InjectLinks({
		@InjectLink(resource = PartidoResource.class, style = Style.ABSOLUTE, rel = "partidos", title = "Latest Partidos", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION),
		@InjectLink(resource = PartidoResource.class, style = Style.ABSOLUTE, rel = "self edit", title = "Partido", type = MediaType.PARTIDOS_API_PARTIDO, method = "getPartido", bindings = @Binding(name = "idpartido", value = "${instance.idpartido}")) })
	
	private List<Link> links;
	private int idpartido;
	private String e_local;
	private String e_visitante;
	private int jornada;
	private String fechapartido;
	private int puntuacionl;
	private int puntuacionv;
	private String lugar;
	private long last_modified;
	private long creation_timestamp;
	
	private String imageURL1;
	private String imageURL2;
	private String imageURL3;
	private String filename1;
	private String filename2;
	private String filename3;
	
	

	
	public String getImageURL1() {
		return imageURL1;
	}
	public void setImageURL1(String imageURL1) {
		this.imageURL1 = imageURL1;
	}
	public String getImageURL2() {
		return imageURL2;
	}
	public void setImageURL2(String imageURL2) {
		this.imageURL2 = imageURL2;
	}
	public String getImageURL3() {
		return imageURL3;
	}
	public void setImageURL3(String imageURL3) {
		this.imageURL3 = imageURL3;
	}
	public String getFilename1() {
		return filename1;
	}
	public void setFilename1(String filename1) {
		this.filename1 = filename1;
	}
	public String getFilename2() {
		return filename2;
	}
	public void setFilename2(String filename2) {
		this.filename2 = filename2;
	}
	public String getFilename3() {
		return filename3;
	}
	public void setFilename3(String filename3) {
		this.filename3 = filename3;
	}
	public List<Link> getLinks() {
		return links;
	}
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	public int getIdpartido() {
		return idpartido;
	}
	public void setIdpartido(int idpartido) {
		this.idpartido = idpartido;
	}
	public String getE_local() {
		return e_local;
	}
	public void setE_local(String e_local) {
		this.e_local = e_local;
	}
	public String getE_visitante() {
		return e_visitante;
	}
	public void setE_visitante(String e_visitante) {
		this.e_visitante = e_visitante;
	}
	public int getJornada() {
		return jornada;
	}
	public void setJornada(int jornada) {
		this.jornada = jornada;
	}
	public String getFechapartido() {
		return fechapartido;
	}
	public void setFechapartido(String fechapartido) {
		this.fechapartido = fechapartido;
	}
	public int getPuntuacionl() {
		return puntuacionl;
	}
	public void setPuntuacionl(int puntuacionl) {
		this.puntuacionl = puntuacionl;
	}
	public int getPuntuacionv() {
		return puntuacionv;
	}
	public void setPuntuacionv(int puntuacionv) {
		this.puntuacionv = puntuacionv;
	}
	public String getLugar() {
		return lugar;
	}
	public void setLugar(String lugar) {
		this.lugar = lugar;
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