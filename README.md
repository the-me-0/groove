# **Groove**

## Getting Started

**Groove** is vowed to be a private spotify-like application, developed by (Noah Philippe)[https://github.com/the-me-0], based on « Code With Antonio » tutorial available (here)[https://www.youtube.com/watch?v=2aeMRB8LL4o].

## Advancements

Project global advancement
- [ ] tutorial (*0:56:21*/*6:47:59*)
- [ ] invite link
- [ ] YouTube integration
- [ ] Mobile App

### Advancements appendix

- tutorial: shows the time of tutorial followed on the complete tutorial duration
- invite link: this functionality adds some kind of control, as for a new user to create an account on **Groove**, a sponsorship link will be needed.
- YouTube integration: this functionality allows users to add music directly by searching it using YouTube, and automates the process to add the music to **Groove** from its link.
- Mobile App: this step is a huge step, consisting of the creation of a **Groove** mobile application.

## How to reproduce

As this project is somewhat of a variant to the spotify clone course offered by Antonio,
I will here list all the steps to reproduce this project,
like if you were in my shoes (except I can"t offer you any video as I don't know how to make one).

### Step 1 — Project frame
Follow the (Spotify-clone)[] course until you reach **0:56:21**.

### Step 2 — Prisma integration and *lib/* folder
Add prisma to your project using `npm i @prisma/client` then `npx prisma init`.
Then, create a `schema.prisma` file located in a *prisma* folder,
copy the content my `schema.prisma` and paste it in yours.

You may also want to create the *db.ts* file right now,
this file being located in the */lib* folder that you must create.
Copy the content of my *db.ts* file to fill yours.
As you just created the *lib* folder in your project,
you can now move your *components* folder inside the *lib/* folder.
This change will force you to refactor your code, as the imports just changed.
You will also have to edit the *tailwind.config.ts* file to match your new *components/* folder emplacement.
Nevertheless, I prefer this layout for the project.

### Step 3 — Docker containers creation
Copy my *docker-compose.yml* file and paste it in your project,
as you will need this file to create the containers that will host your database and file-server.
Run your docker stack using the `docker compose up` command, and complete you *.env* file with the correct information,
so prisma can correctly connect to your newly created database.

### Step 4 — Clerk integration

