package com.hubrick.report;

import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import java.util.Optional;

public class ReportRepository {

    private JsonObject data;

    ReportRepository(Vertx vertx) {
        this.data = vertx.fileSystem().readFileBlocking("report.json").toJsonObject();
    }

    public void list(Handler<AsyncResult<JsonObject>> handler) {
        handler.handle(Future.succeededFuture(this.data));
    }

    public void update(String id, JsonObject body, Handler<AsyncResult<JsonObject>> handler) {
        JsonArray elements = this.data.getJsonArray("elements");
        Optional<JsonObject> report = elements
            .stream()
            .map(JsonObject.class::cast)
            .filter(o -> o.getString("id", "-1").equals(id))
            .findFirst();


        if (report.isPresent()) {
            report.get().put("state", body.getString("ticketState"));
            handler.handle(Future.succeededFuture(report.get()));
        } else {
            handler.handle(Future.failedFuture("Report not found"));
        }
    }
}

