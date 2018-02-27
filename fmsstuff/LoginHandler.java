package handlers;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.sql.SQLException;

import requestResponse.LoginRequest;
import requestResponse.MessageResponse;
import requestResponse.RegisterResponse;
import service.Service;

import static java.net.HttpURLConnection.HTTP_OK;

/**
 * Created by hyrum.richardson on 10/31/2017.
 */

public class LoginHandler implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {

        System.out.println("Handling Login Request...");

        InputStreamReader reqBody = new InputStreamReader(exchange.getRequestBody());
        OutputStreamWriter respBody = new OutputStreamWriter(exchange.getResponseBody());
        Service servant = new Service();
        LoginRequest lReq;

        Gson gson = new Gson();
        try {
            lReq = gson.fromJson(reqBody, LoginRequest.class);
        }
        catch(Exception e) {
            exchange.sendResponseHeaders(HTTP_OK, 0);
            String returnString = gson.toJson(new MessageResponse("Request property missing or has invalid value"));
            respBody.write(returnString);
            System.out.println("Error: Request property missing or has invalid value");
            respBody.close(); return;
        }
        reqBody.close();

        try {
            RegisterResponse rRep = servant.login(lReq);
            exchange.sendResponseHeaders(HTTP_OK, 0);

            String returnString = gson.toJson(rRep, RegisterResponse.class);
            respBody.write(returnString);
            System.out.println("Handled Login Request.");

        } catch (SQLException e) {
            exchange.sendResponseHeaders(HTTP_OK, 0);
            String returnString = gson.toJson(new MessageResponse(e.getMessage()));
            respBody.write(returnString);
            System.out.println("Error: " + e.getMessage());
        }
        finally{
            respBody.close(); //sends body back
        }
    }
}
