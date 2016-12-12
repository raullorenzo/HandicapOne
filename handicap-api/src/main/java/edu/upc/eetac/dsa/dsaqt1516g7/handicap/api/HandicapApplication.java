package edu.upc.eetac.dsa.dsaqt1516g7.handicap.api;

import org.glassfish.jersey.linking.DeclarativeLinkingFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import java.util.Enumeration;
import java.util.ResourceBundle;
 
public class HandicapApplication extends ResourceConfig {
	public HandicapApplication() {
		super();
		register(MultiPartFeature.class);
		register(DeclarativeLinkingFeature.class);
		ResourceBundle bundle = ResourceBundle.getBundle("application");

		Enumeration<String> keys = bundle.getKeys();
		while (keys.hasMoreElements()) {
			String key = keys.nextElement();
			property(key, bundle.getObject(key));
		}
	}
}

