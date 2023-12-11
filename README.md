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
- [ ] ~~ Overall review before **Beta 0.1** `ongoing`
- [ ] Playlist/Album creation
- [ ] Player update - shuffle, loop, queue display, song duration & song progress (+ set playing second ?)
- [ ] Spotify integration - song upload using spotify-down
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

## Start-up

- To start the project, go in your *projects/* folder, clone this repository using `git clone https://github.com/the-me-0/groove.git`.
- Move to the newly created folder (`cd groove`), create a copy of the "*.env.example*" file and rename it "*.env*".
- You now have to complete your "*.env*" file with your infos, being your clerk keys & an ApiKey (you can generate a password [here](https://www.lastpass.com/fr/features/password-generator#generatorTool) but I advise you not to include special characters to avoid issues.)
- When you environment file is complete, run `docker compose up -d`, `pnx prisma generate`, `pnx prisma migrate dev` (name the migration whatever you want, like "main").
- You are now ready to run you project with `npm run dev` !

### Once up
You will now need to generate an invitation link in order to create your first user.
To do so, you have to send this post request : `curl -X POST "http://localhost:3000/api/invite-link?api-key=<replace-me>"`
**Watch-out : an invite-link is only valid once. You will have to recreate one if you want to create another user.**

## How to reproduce

As this project is a fork to the spotify clone course offered by Antonio,
I will, in the future, produce a documentation / guide on how to develop this application ; as did Antonio.

## license

This project is under the [MIT Licence](https://opensource.org/license/mit/).

## Contact

Developed by **Noah Philippe**, available on discord in [Antonio's server](https://discord.gg/2Dtkraxnz4).
Feel free to ping me, or to send a review/questions about this project in the [dedicated post](https://discord.com/channels/1079557715497595013/1182019802269765642).
