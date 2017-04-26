@echo off
TITLE Client
cd client 
@echo on
start /wait npm install & exit
start /wait npm build & exit
start /wait npm start
start "" http://localhost:8080/