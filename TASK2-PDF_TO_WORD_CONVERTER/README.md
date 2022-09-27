# PDF To Word Converter

## About Project
This is a simple PDF to Word converter website project that is built using React, NodeJs and Express.

## Setup Instructions
-	Node.js  should be install in your system to run the application.
-	Download the code from the repository to your system.
-	Open terminal and change directory to point to the PDF_TO_WORD_CONVERTER folder
-	Now run the following command on terminal to install client-side dependencies
```
cd client
npm install
```
-	After all the dependencies are installed run the following commands to install server-side dependencies
```
cd ../server
npm install
```
-	After all the dependencies are installed run the following command to start the application
```
npm install
```
-	Next you will also need a PDFTRON API KEY. Visit the link below to get free Demo Key.
 
    https://www.pdftron.com/documentation/nodejs/get-started/integration/
-	After getting your API key navigate to the server folder inside the Project folder and open .env file replace the text YOUR_API_KEY with your PTFTRON API KEY and save the file.
```
MY_API = YOUR_API_KEY
```
-	You also need to download Structured Output Module for your system from the following link

    https://www.pdftron.com/documentation/nodejs/info/modules/#structured-output-module
-	Once the Structured Output Module is downloaded extract the contents and copy or move the content to the lib folder inside the server folder.
-	Now simply run the following command to start the application (inside of the server folder) 
```
npm run dev
```
