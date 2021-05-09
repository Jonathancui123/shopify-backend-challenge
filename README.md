<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->
  <h1 align="center"> :label: :framed_picture: </h1>

  <h3 align="center">Invaluable Images</h3>

  <p align="center">
    A platform to auction images in support of charitable causes!
    <!-- <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Inspired by charitable auction events, _Invaluable Images_ is a digital auction house for images where artists and photographers can specify a charitable organization that they are supporting

#### (Backend) Features:

- Image **upload** and **storage**
- **Create auctions** and associate with images
- Basic **authentication** for users
- Create/update/delete user **profiles**

#### In progress:

- Watermarks for image previews and access control for full-size images
- Placing bids on auctions and determining a winner
- Frontend client

### Built With

- **Node/Express** backend in Typescript
- **AWS S3** to store images
- **MongoDB/Mongoose** for auction, bid, user information
- **Jest/Supertest** for testing
- **Bcrypt/Passport** for user authentication

Continued in [Acknowledgements](##acknowledgements).

<!-- GETTING STARTED -->

## Getting Started

This repo holds both the frontend (in progress) and backend so that they are accessible at a single link.

`/server` contains the node backend

`/client` contains the react frontend

### Prerequisites

  - Node v12.18.0
  - Typescript v3.9.5
  - An available MongoDB cluster: a cluster was created for this project on [MongoDB Atlas](https://cloud.mongodb.com) but for local development you will need to start your own.
  - [AWS S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) for image storage

### Installation

1. Clone the project
  ```sh
  git clone https://github.com/Jonathancui123/shopify-backend-challenge.git
  ```
2. Move into the server folder
   ```sh
   cd server
   ```
3. Install NPM packages and development packages
   ```sh
   npm install
   npm install --dev
   ```
4. (Still within `/server`), rename `.env.example` to `.env` and then enter environment variables for MongoDB and AWS as described
5. To build and start the app:
   ```sh
   npm run build
   npm run serve
   ```

<!-- CONTACT -->

### Testing

We test with [Jest](https://jestjs.io/), [Supertest](https://www.npmjs.com/package/supertest) and [MongoDB memory server](https://github.com/nodkz/mongodb-memory-server) to simulate database calls. The mock database is configured in `jest-mongodb-config.js`. [Chai](https://www.chaijs.com/) is also used for the expect function.

To run tests, simply run:

```sh
  npm run test
```

Coverage reports should be created as well.

<!-- CONTACT -->

## Contact

Jonathan Cui - j62cui@uwaterloo.ca

Project Link: [https://github.com/Jonathancui123/shopify-backend-challenge](https://github.com/Jonathancui123/shopify-backend-challenge)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

I used [Microsoft's Typescript/Node Starter](https://github.com/microsoft/TypeScript-Node-Starter) to jumpstart user profile and user authentication functionalities

[Multer](https://www.npmjs.com/package/multer) was also used to support image uploads
