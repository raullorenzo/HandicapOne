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
import edu.upc.eetac.dsa.dsaqt1516g7.handicap.api.PickResource;


public class PickCollection {
	@InjectLinks({
		@InjectLink(resource = PickResource.class, style = Style.ABSOLUTE, rel = "create-pick", title = "Create pick", type = MediaType.PARTIDOS_API_PARTIDO),
		@InjectLink(value = "/picks?before={before}", style = Style.ABSOLUTE, rel = "before", title = "Picks anteriores", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION, bindings = { @Binding(name = "before", value = "${instance.oldestTimestamp}") }),
		@InjectLink(value = "/picks?after={after}", style = Style.ABSOLUTE, rel = "after", title = "Picks nuevos", type = MediaType.PARTIDOS_API_PARTIDO_COLLECTION, bindings = { @Binding(name = "after", value = "${instance.newestTimestamp}") }) })
	
	private List<Link> links;
	private List<Pick> picks;
	private long newestTimestamp;
	private long oldestTimestamp;
	private int primerpick;
	private int ultimopick;
	
	
	public List<Link> getLinks() {
		return links;
	}
 
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	
	public void addPick(Pick pick){
		picks.add(pick);
	}
	
	public PickCollection() {
		super();
		picks = new ArrayList<>();
	}

	public List<Pick> getPicks() {
		return picks;
	}

	public void setPicks(List<Pick> picks) {
		this.picks = picks;
	}

	public int getPrimerpick() {
		return primerpick;
	}

	public void setPrimerpick(int primerpick) {
		this.primerpick = primerpick;
	}

	public int getUltimopick() {
		return ultimopick;
	}

	public void setUltimopick(int ultimopick) {
		this.ultimopick = ultimopick;
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