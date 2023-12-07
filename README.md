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
- [ ] invite link `ongoing`
- [x] Song upload
- [ ] Song fetching & list `ongoing`
- [ ] Favorites functionality
- [ ] Player functionality
- [ ] Playlist/Album creation
- [ ] YouTube integration - ytb link to mp3 automation
- [ ] Mobile App (PWA)
- [ ] BONUS : discord rich presence integration

## Start the project - development

**Technologies needed :**
- NodeJS & npm
- docker-compose (included by default with Docker Desktop)

### How to run

- clone this repository with `git clone https://github.com/the-me-0/groove-web.git`
- execute `cd groove-web/`
- run `docker compose up` and wait for docker to download and build the needed images and containers
- create a [Clerk organization](https://clerk.com/)
- create a `.env` file based upon the `.env.example`
- copy your clerk keys into the `.env`
- install dependencies with `npm i`
- run the project using `npm run dev`

## Start the project - deployment

**This project is still under active development.**
This project has never been deployed anywhere, and thus no guide exists on how to deploy this app.

## Colors, Logo, etc

**Color palette**
 - https://colorhunt.co/palette/0f0f0f232d3f005b41008170

**Logo ;** *tiny redesign only*
 - https://www.behance.net/gallery/183702371/Spotify-Redesign

## How to reproduce

As this project is a fork to the spotify clone course offered by Antonio,
I will, in the future, produce a documentation / guide on how to develop this application ; as did Antonio.

## license

This project is not yet under license.

## Contact

Developed by **Noah Philippe**, available on discord in [Antonio's server](https://discord.gg/2Dtkraxnz4).
Feel free to ping me, or to send a review/questions about this project in the [dedicated post](https://discord.com/channels/1079557715497595013/1182019802269765642).
