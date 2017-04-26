@echo off
TITLE Client
cd client 
@echo on
npm install
npm build
npm start
start "" http://localhost:8080/
PAUSE