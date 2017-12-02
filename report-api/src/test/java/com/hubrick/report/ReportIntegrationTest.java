package com.hubrick.report;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.is;

public class ReportIntegrationTest {

    @BeforeClass
    public static void load() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = Integer.getInteger("port", 3000);
    }

    @Test
    public void checkRetrieveReports() {
        when()
            .get("/reports")
        .then()
            .statusCode(200)
            .contentType(ContentType.JSON);
    }

    @Test
    public void checkUpdateReportById() {
        given()
            .body("{ \"ticketState\": \"CLOSED\" }")
        .when()
            .put("/reports/0103e005-b762-485f-8f7e-722019d4f302")
        .then()
            .statusCode(202)
            .contentType(ContentType.JSON)
            .body("state", is("CLOSED"));
    }

    @Test
    public void checkUpdateNotExistingId() {
        given()
            .body("{ \"ticketState\": \"CLOSED\" }")
        .when()
            .put("/reports/abc")
        .then()
            .statusCode(404);
    }

    @AfterClass
    public static void unload() {
        RestAssured.reset();
    }
}
