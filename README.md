Create a README.md file detailing how to run a vanilla javascript app with local server

# Running the Vanilla JavaScript App from the Repo

This guide will show you how to run the vanilla JavaScript app from the repo https://github.com/guzzyman/crdochallenge.git with a local server.

## Prerequisites

Before you can run the app, you will need to have a few things installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- A text editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))
- A web browser (e.g. Chrome, Firefox, Safari)

## Cloning the Repository

1. Open your terminal and navigate to the directory where you want to clone the repository: `cd <directory>`
2. Clone the repository using Git: `git clone https://github.com/guzzyman/crdochallenge.git`
3. Navigate into the cloned repository: `cd crdochallenge`

## Installing Dependencies

## Step 1: Install a Local Server

Install a local server such as [http-server](https://www.npmjs.com/package/http-server) using npm (Node Package Manager). This will allow you to run your app locally on your computer without having to upload it to a web server or use an online service such as CodePen or Glitch. To install http-server, open up your terminal and type in `npm install -g http-server`. This will install http-server globally on your computer so that it can be used from any directory.

## Step 2: Run the App

Once http-server is installed, navigate to the directory where your HTML and JavaScript files are located in the terminal and type in `http-server`. This will start up a local server on port 8080 (you can specify another port if needed). Open up your web browser and go to `localhost:8080` to view your app!
