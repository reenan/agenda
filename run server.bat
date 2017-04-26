@echo off
TITLE Server
cd server 
@echo on
mvn clean install exec:java -Dexec.args=server.port=8090
PAUSE