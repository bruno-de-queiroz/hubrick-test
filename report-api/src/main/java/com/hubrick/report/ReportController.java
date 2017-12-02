package com.hubrick.report;

import io.vertx.core.Vertx;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

public class ReportController {

    private static final String PATH = "/reports";

    private final ReportRepository repository;

    private ReportController(ReportRepository repository) {
        this.repository = repository;
    }

    private void list(RoutingContext context) {
        repository.list(ar -> {
            if (ar.succeeded()) {
                context
                    .response()
                    .putHeader("content-type", "application/json; charset=utf-8")
                    .end(Json.encodePrettily(ar.result()));
            } else {
                context
                    .response()
                    .setStatusCode(500)
                    .end();
            }
        });
    }

    private void update(RoutingContext context) {
        String id = context.request().getParam("id");
        repository.update(id, context.getBodyAsJson(), ar -> {
            if (ar.succeeded()) {
                context.response()
                    .setStatusCode(202)
                    .putHeader("content-type", "application/json; charset=utf-8")
                    .end(Json.encodePrettily(ar.result()));
            } else {
                context
                    .response()
                    .setStatusCode(404)
                    .end();
            }
        });
    }

    static void register(Router router, Vertx vertx) {
        ReportController controller = new ReportController(new ReportRepository(vertx));
        router.get(PATH).handler(controller::list);
        router.put(PATH + "/:id").handler(controller::update);
    }
}
