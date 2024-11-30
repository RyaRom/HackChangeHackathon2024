FROM eclipse-temurin:17 AS build
RUN apt-get update && apt-get install -y maven
WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17

WORKDIR /app

COPY --from=build /app/target/HackChangeHackathon-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-jar", "HackChangeHackathon-0.0.1-SNAPSHOT.jar"]