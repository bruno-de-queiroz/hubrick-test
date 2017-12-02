package com.hubrick.report;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.file.FileSystem;
import io.vertx.core.json.JsonObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ReportRepositoryTest {

    @Mock
    private Vertx vertx;

    @Mock
    private FileSystem fileSystem;

    private ReportRepository repository;

    @Before
    public void setUp() throws URISyntaxException, IOException {
        URI uri = ReportRepositoryTest.class.getClassLoader().getResource("fixture.json").toURI();
        Buffer data = Buffer.buffer(new String(Files.readAllBytes(Paths.get(uri))));

        when(fileSystem.readFileBlocking(any())).thenReturn(data);
        when(vertx.fileSystem()).thenReturn(fileSystem);

        repository = new ReportRepository(vertx);
    }

    @Test
    public void testUpdateInvalidIdShouldFail() {
        repository.update("abc", new JsonObject().put("ticketState", "CLOSED"), ar -> {
            assertTrue(ar.failed());
        });
    }

    @Test
    public void testUpdateValidIdShouldSucceed() {
        repository.update("0103e005-b762-485f-8f7e-722019d4f302", new JsonObject().put("ticketState", "CLOSED"), ar -> {
            assertTrue(ar.succeeded());
            assertThat(ar.result().getString("state"), is("CLOSED"));
        });
    }
}
