package com.hubrick.report;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.LoggerHandler;

public class ReportVerticle extends AbstractVerticle {

    @Override
    public void start(Future<Void> startFuture) throws Exception {

        Integer port = config().getInteger("port");

        Router router = Router.router(vertx);

        router.route().handler(LoggerHandler.create());
        router.route().handler(BodyHandler.create());
        router.route().handler(
            CorsHandler.create("*")
                .allowedMethod(HttpMethod.GET)
                .allowedMethod(HttpMethod.PUT)
                .allowedMethod(HttpMethod.OPTIONS)
                .allowedHeader("Content-Type")
        );

        ReportController.register(router, vertx);

        vertx
            .createHttpServer()
            .requestHandler(router::accept)
            .listen(port, ar -> {
                if (ar.failed()) {
                    startFuture.fail(ar.cause());
                } else {
                    startFuture.complete();
                }
            });
    }
}
