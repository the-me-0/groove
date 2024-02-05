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

**Groove** is vowed to be a private spotify-like application, **entirely self-hosted**, developed by [Noah Philippe](https://github.com/the-me-0), based on « Code With Antonio »'s tutorial available [here](https://www.youtube.com/watch?v=2aeMRB8LL4o).

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
- [x] Production Ready build & https
- [x] ~~ Overall review before **Beta 0.2** `--> Released !`
- [ ] Player shuffle option
- [ ] Song page & share song option `ongoing - share part done`
- [ ] Song & playlist deletion
- [ ] Song queue display (page) & "Add to queue" option
- [ ] Song search upgrade
- [ ] ~~ Overall review before **Beta 0.3**
- [ ] Spotify integration - song upload using spotify-down
- [ ] ~~ Overall review before **Beta 0.4**
- [ ] Mobile App (PWA)

**BONUS :**
- [x] Non-NGINX dependant
- [ ] songs start to play while they load `ongoing`

## Start the project - development

**Technologies needed :**
- NodeJS & npm
- docker-compose (included by default with Docker Desktop)

### How to run

- clone this repository with `git clone https://github.com/the-me-0/groove.git`
- execute `cd groove/`
- run `docker compose up -d` and wait for docker to download, build and start the needed images and containers
- create a `.env` file based upon the `.env.example`
- install dependencies with `npm i`
- run `npw prisma generate` and `npx prisma db push` <- generates DB types for typescript & creates the DB model in docker container
- run the project using `npm run dev`

## Start the project - deployment/production
*This part will soon be filled with more information. The latest release ([v0.1.2-beta Solid Start](https://github.com/the-me-0/groove/releases/tag/v0.1.2-beta)) is **production-ready** and currently used in my own production server.*

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
