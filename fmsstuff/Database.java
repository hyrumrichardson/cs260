package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by hyrum.richardson on 10/25/2017.
 */

public class Database {

    Connection connection = null;
    Statement stmt = null;
    ResultSet results = null;

    UserDAO userdao;
    PersonDAO persondao;
    EventDAO eventdao;
    AuthDAO authdao;

    public UserDAO getUserdao() {
        return userdao;
    }
    public PersonDAO getPersondao() {
        return persondao;
    }
    public EventDAO getEventdao() {
        return eventdao;
    }
    public AuthDAO getAuthdao() {
        return authdao;
    }

    public Database() {
        try {
            loadDatabaseDriver();
            openDB();
        }
        catch (ClassNotFoundException e) {}
        catch (SQLException e) {System.out.println(e.getMessage());}
    }

    /**
     * Load Database Driver
     * @throws ClassNotFoundException
     */
    public void loadDatabaseDriver() throws ClassNotFoundException {
        String driver = "org.sqlite.JDBC";
        Class.forName(driver);		// throws ClassNotFoundException
    }

    /**
     * Open Database Connection
     * @throws SQLException
     */
    public void openDB() throws SQLException {
        String dbname = "jdbc:sqlite:fmsdb.db";
        connection = DriverManager.getConnection(dbname); // throws SQLException

        userdao = new UserDAO(connection);
        persondao = new PersonDAO(connection);
        eventdao = new EventDAO(connection);
        authdao = new AuthDAO(connection);

        //System.out.println("Connection to SQLite has been established.");
    }
    //DAO objects
    public void createTables() throws SQLException{
        stmt = connection.createStatement();

        stmt.executeUpdate("DROP TABLE if exists UserTable;");
        stmt.executeUpdate("DROP TABLE if exists PersonTable;");
        stmt.executeUpdate("DROP TABLE if exists EventTable;");
        stmt.executeUpdate("DROP TABLE if exists AuthTable;");
        //stmt.executeUpdate("CREATE TABLE UserTable(PersonID text not null,Username text not null primary key autoincrement,Password text not null,EmailAddress text not nullFirstName text not null,LastName text not null,Gender text not null);");
        stmt.executeUpdate("CREATE TABLE UserTable\n" +
                "(\n" +
                "    Username text not null primary key,\n" +
                "    Password text not null,\n" +
                "    EmailAddress text not null,\n" +
                "    FirstName text not null,\n" +
                "    LastName text not null,\n" +
                "    Gender text not null,\n" +
                "    PersonID text not null\n" +
                ");");
        stmt.executeUpdate("CREATE TABLE PersonTable" +
                "(" +
                "PersonID text not null primary key," +
                "Descendant text not null," +
                "FirstName text not null," +
                "LastName text not null," +
                "Gender text not null," +
                "Father text," +
                "Mother text," +
                "Spouse text" +
                ");");
        stmt.executeUpdate("CREATE TABLE EventTable" +
                "(" +
                "    EventID text not null primary key," +
                "    Person text not null," +
                "    Latitude text not null," +
                "    Longitude text not null," +
                "    Country text not null," +
                "    City text not null," +
                "    EventType text not null," +
                "    Year text not null," +
                "    Descendant text not null" +
                ");");
        stmt.executeUpdate("CREATE TABLE AuthTable" +
                "(" +
                "    Token text not null primary key," +
                "    Username text not null" +
                ");");
        stmt.close();
    }

    public void close() throws SQLException {
        connection.close();
    }

}
