# GROOVE — Self hosted spotify client
## Powered by NextJS and Docker

[![forthebadge](https://forthebadge.com/images/badges/powered-by-phoenix.svg)](https://forthebadge.com)

### Table of Contents
- [Introduction](#introduction)
- [Roadmap](#roadmap)
- [How to reproduce](#how-to-reproduce)
- [License](#license)
- [Contact](#contact)

## Introduction

**Groove** is vowed to be a private spotify-like application, nearly entirely self-hosted, developed by [Noah Philippe](https://github.com/the-me-0), based on « Code With Antonio »'s tutorial available [here](https://www.youtube.com/watch?v=2aeMRB8LL4o).

## Roadmap

Project global advancement
- [x] Project global structure
- [x] Prisma & database setup
- [x] Clerk setup (auth, user hook)
- [x] invite link
- [x] Song upload
- [x] Song fetching & list
- [x] Favorites functionality
- [x] Player functionality
- [x] ~~ Overall review before **Beta 0.1** `--> Released !`
- [x] Playlist creation
- [x] Player update - loop, song duration & song progress
- [x] Clerk removal
- [ ] Production Ready build & https `ongoing`
- [ ] ~~ Overall review before **Beta 0.2**
- [ ] Player shuffle option
- [ ] Song page & share song option
- [ ] Song deletion
- [ ] Song queue display (page) & "Add to queue" option
- [ ] Song search upgrade & security
- [ ] ~~ Overall review before **Beta 0.3**
- [ ] Spotify integration - song upload using spotify-down `ongoing`
- [ ] ~~ Overall review before **Beta 0.4**
- [ ] Mobile App (PWA)

## Start the project - development

**Technologies needed :**
- NodeJS & npm
- docker-compose (included by default with Docker Desktop)

### How to run

- clone this repository with `git clone https://github.com/the-me-0/groove-web.git`
- execute `cd groove-web/`
- run `docker compose up` and wait for docker to download and build the needed images and containers
- create a `.env` file based upon the `.env.example`
- install dependencies with `npm i`
- run `docker compose up` in order to start your database and wait for it to initialise
- run `npw prisma generate` and `npm run migrate` and name the migration "main" <- generates DB types for typescript & creates the DB in docker
- run the project using `npm run dev`

## Start the project - deployment/production

**This project is still under active development.**
This project will *very* soon be pushed in production. As this is still an early version (beta), everything might not yet be ready.
As much of the work has already been done for the deployment, here's how things should work :
- The *main* branch of the repository contains the production version of the application
- The `compose.yml` file contains another container called "web", we have nginx config files in a folder and a `Dockerfile` appeared
- The project is meant to be hosted entirely on Docker, so a single `docker compose up --build` will start the application
- After ~ 2 minutes of build and start-up, the project should be up and running on localhost:4000 !

**IMPORTANT NOTICE**
The production build is pushed manually (for now) to the docker hub, and available [here](https://hub.docker.com/repository/docker/phoenlxx/groove-web/general).
You can find in the docker repository a `docker-compose.yml` file content that can start the project in its production version.
Further automation will be implemented in the future to make the docker hub repository mirror the changes on this GitHub main branch (CI/CD dev feature).

Personal note:
As there is no CI/CD for now, I need to push the new images manually. Here are some docker commands :
- `docker login`
- `docker build -t "phoenlxx/groove-web:<tagname>" .`
- `docker tag <oldTagname> <newTagname>`
- `docker push phoenlxx/groove-web:<tagname>`

## Colors, Logo, etc

**Color palette**
 - https://colorhunt.co/palette/0f0f0f232d3f005b41008170

**Logo ;** *tiny redesign only*
 - https://www.behance.net/gallery/183702371/Spotify-Redesign

## Once up

You will now need to generate an invitation link in order to create your first user.
To do so, you have to send this post request : `curl -X POST "http://localhost:3000/api/sponsorship?api-key=<replace-me>"`

## How to reproduce

As this project is a fork to the spotify clone course offered by Antonio,
I might, in the future, produce a documentation / guide on how to develop this application ; as did Antonio.

## license

This project is under the [MIT Licence](https://opensource.org/license/mit/).

## Contact

Developed by **Noah Philippe**, available on discord in [Antonio's server](https://discord.gg/2Dtkraxnz4).
Feel free to ping me, or to send a review/questions about this project in the [dedicated post](https://discord.com/channels/1079557715497595013/1182019802269765642).
