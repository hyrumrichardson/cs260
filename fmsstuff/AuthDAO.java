package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Auth;

public class AuthDAO {

	public AuthDAO(Connection c){
		this.connection = c;
	};

	Connection connection = null;
	PreparedStatement stmt = null;
	ResultSet results = null;

	/**
	 * Delete Tuple
	 * @param token Auth to delete
	 * @throws SQLException
	 */
	public void deleteAuth(String token) throws SQLException {
		String delete = "DELETE FROM AuthTable WHERE Token = ? ";
		stmt = connection.prepareStatement(delete);       // throws SQLException
		stmt.setString( 1, token );                       // throws SQLException
		stmt.executeUpdate();                             // throws SQLException
		stmt.close();
	}

	/**
	 * Insert Auth
	 * @param x Auth to insert
	 * @throws SQLException
	 */
	public void insertAuth(Auth x) throws SQLException {
		String insert = "insert into AuthTable values ( ?, ?) ";
		stmt = connection.prepareStatement(insert);       // throws SQLException
		stmt.setString( 1, x.getAuthToken() );// throws SQLException
		stmt.setString( 2, x.getUsername() );
		stmt.executeUpdate();                             // throws SQLException
		stmt.close();// throws SQLException
	}

	/**
	 * Execute a query
	 * @throws SQLException
	 */
	public Auth queryAuth(String token) throws SQLException {

		String query = "select * from AuthTable where Token = ? ";
		stmt = connection.prepareStatement(query);        // throws SQLException
		stmt.setString(1, token);                       // throws SQLException
		results = stmt.executeQuery();                    // throws SQLException

		String aT = results.getString( 1 );                // throws SQLException
		String un = results.getString( 2 );         // throws SQLException
		Auth a = new Auth(aT, un);

		results.close();                                  // throws SQLException
		stmt.close();
		return a;
	}

	public String queryUserAuth(String un) throws SQLException {

		String query = "select * from AuthTable where Username = ? ";
		stmt = connection.prepareStatement(query);        // throws SQLException
		stmt.setString(1, un);                       // throws SQLException
		results = stmt.executeQuery();                    // throws SQLException

		String aT = results.getString( 1 );                // throws SQLException

		results.close();                                  // throws SQLException
		stmt.close();
		return aT;
	}

}
