FROM openjdk:8u121-jre-alpine

COPY build/libs/report-api-1.0-SNAPSHOT-fat.jar /service.jar
COPY build/resources/main/config.json /config.json

EXPOSE 3000

CMD ["java", "-Xmx64m", "-jar" ,"/service.jar", "-conf", "/config.json"]
