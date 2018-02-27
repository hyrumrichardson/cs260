package server;

import dataloader.DataLoader;
import requestResponse.RegisterRequest;
import requestResponse.RegisterResponse;
import service.Service;

/*public class Server2 {

	public static void main(String[] args) {

		Service servant = new Service();
		RegisterRequest req = new RegisterRequest("pennypacker","giddyup","HEPennypacker@pennypacker.com","Cosmo","Kramer","m");
		try {
			RegisterResponse resp = servant.register(req);
			//String s = servant.people(resp.getAuthToken());
			//String s2 = servant.events(resp.getAuthToken());
			String s3 = servant.load(new DataLoader().getLoadRequest());

			System.out.println(s3);
		}
		catch (Exception e)  {e.printStackTrace();}



		/*Database database = new Database();
		try {
			database.createTables();


			UserDAO userdao = database.getUserdao();
			User u = new User("pennypacker", "giddyup","HEPennypacker@pennypacker.com","Cosmo","Kramer","m");
			userdao.insertUser(u);
			User u2 = new User("serenitynow","bosco","cantstandya@cs.byu.edu","George","Costanza","m");
			userdao.insertUser(u2);

			PersonDAO pdao = database.getPersondao();
			String pID = new PersonID().toString();
			String fID = new PersonID().toString();
			String mID = new PersonID().toString();
			String sID = new PersonID().toString();
			Person p = new Person(pID,"hyrumjr","hyrum","rich","m",fID,mID,sID);
			pdao.insertPerson(p);
			pdao.queryPerson(p.getPersonID().toString());
			//pdao.deletePerson(p.getPersonID());

			EventDAO edao = database.getEventdao();
			Event ev = new Event(new EventID().toString(), new PersonID().toString(),2.3,-4.5,"USA","Boston","death",1987, "un");
			edao.insertEvent(ev);
			edao.queryEvent(ev.getEventID().toString());
			//edao.deleteEvent(ev.getEventID());

			AuthDAO adao = database.getAuthdao();
			Auth a = new Auth("hyrumjr");
			adao.insertAuth(a);
			adao.queryAuth(a.getAuthToken());
			//adao.deleteAuth(a.getAuthToken());

			Service servant = new Service(database);

			servant.login(new LoginRequest("hyrumjr","umbreon"));

			database.close();

			Example ex = new Example(u,u2,p,ev);

			Gson gson = new GsonBuilder().create();
			try {
				FileWriter writer = new FileWriter("lib/src/example2.json");
				String s = gson.toJson(ex);
				writer.write(s);
			}catch(IOException e) {return;}
		}
		catch (Exception e){
			e.printStackTrace();
		}





	}

}*/
