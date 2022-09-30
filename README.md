[![MIT License][license-shield]][license-url]

> **Warning**
> This repository is under active development and will face code-breaking changes.

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/magnusmage/fincor-web-wallet-extention">
    <img src="src/assets/images/logo.png" alt="Logo"  width="100" height="30" objectFit="contain">
  </a>

  <h3 align="center">Fincor Next Generation Of Blockchain</h3>

  <p align="center">
   Fincor is Artificial Intelligence controlled blockchain that solves previously known issues like high energy usage, scalability, centralization, accessibility, interoperability and security. It is a completely autonomous multi-layer blockchain that strives evenly well on both private and public blockchains.
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">Download Demo</a>
    ·
   <a href="https://github.com/Fincor-Blockchain/extension-dapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/Fincor-Blockchain/extension-dapp/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## Getting Started

Follow these instructions to run project locally.

### Prerequisites

#### Install Node JS

- You’ll need to have Node >= 14 on your machine

Refer to https://nodejs.org/en/ to install nodejs

### Installation

- Clone the repository

## Package Installation

Install all the npm packages. Go into the project folder and type the following command to install all npm packages
It will create a folder `node_modules` in root directory and install the packages

```
npm install
```

## Start project

- Set environment variables for the `development` before proceeding

- Place a file called .env.development at the root of your project

- Edit the .env.development file and create your custom environment variables

# .env.development

```
REACT_APP_SALT= "add SALT here"
REACT_APP_SOCKET_URL= "add development socket url here"
REACT_APP_SERVER_URL= "add development api here"
REACT_APP_EXPLORER_URL="add development explorer URL here"
REACT_APP_CHAIN_ID= "add Chain-id here"
```

> **Note** Don't add slash at the end of URLs.

```
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Production build

**Note** Follow all the above steps properly for production build except .env.development

- Set environment variables for the `production` before proceeding

- Place a file called .env.production at the root of your project

- Edit the .env.production file and create your custom environment variables

# .env.production

> **Note** All URLs must be HTTPS for production.

```
REACT_APP_SALT= "add SALT here"
REACT_APP_SOCKET_URL= "add production socket url here"
REACT_APP_SERVER_URL= "add production api here"
REACT_APP_EXPLORER_URL="add production explorer URL here"
REACT_APP_CHAIN_ID= "add Chain-id here"
```

> **Note** Don't add slash at the end of URLs.

```
npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

All done :smile:

## Run Build Locally for verification

- Serve helps you serve a static site.

```
npm install -g serve
```

- After installation run the below command in the application root directory.

```
serve -s build
```

Note: This command will run the build on port 3000 by default.

[license-shield]: https://img.shields.io/static/v1?label=LICENSE&message=MIT&color=blue
[license-url]: https://github.com/Fincor-Blockchain/extension-dapp/blob/master/LICENSE
[product-screenshot]: src/assets/images/fincor_project.png

```
Copyright © 2022 — Fincor.com
```
