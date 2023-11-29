<div style="display: flex; align-items: center; justify-content: center;">
<h1>GROOVE — Self hosted spotify client</h1>
<h3>Powered by NextJS and Docker</h3>
</div>
<br/>

[![forthebadge](https://forthebadge.com/images/badges/powered-by-phoenix.svg)](https://forthebadge.com)

### Table of Contents
- [Introduction](#introduction)
- [Roadmap](#roadmap)
- [How to reproduce](#how-to-reproduce)
- [License](#license) add licence later
- [Contact](#contact) add contact infos

## Introduction

**Groove** is vowed to be a private spotify-like application, developed by [Noah Philippe](https://github.com/the-me-0), based on « Code With Antonio » tutorial available [here](https://www.youtube.com/watch?v=2aeMRB8LL4o).

## Roadmap

Project global advancement
- [ ] tutorial (*0:56:21*/*6:47:59*)
- [ ] invite link
- [ ] YouTube integration
- [ ] Mobile App
- [ ] BONUS : discord rich presence integration

### Roadmap appendix

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
Add prisma to your project using  `npm i -D prisma`, `npm i @prisma/client` then `npx prisma init`.
Then, create a `schema.prisma` file located in a *prisma* folder,
copy the content my `schema.prisma` and paste it in yours.
Do not forget to add the link to your database in your *.env* file:
```dotenv
# You are free to change passwd etc as long at it matches your future docker-compose.yml file
DATABASE_URL="postgresql://groove_admin:S3cret@localhost:5432/groove?schema=public"
```

You may also want to create the *db.ts* file right now,
this file being located in the */lib* folder that you must create.
Copy the content of my *db.ts* file to fill yours.
As you just created the *lib* folder in your project,
you can now move your *components* folder inside the *lib/* folder.
This change will force you to refactor your code, as the imports just changed.
You will also have to edit the *tailwind.config.ts* file to match your new *lib/components/* folder emplacement,
the same goes for the *tailwind.config.js* file.
Nevertheless, I prefer this layout for the project.

### Step 3 — Docker containers creation
Copy my *docker-compose.yml* file and paste it in your project,
as you will need this file to create the containers that will host your database and file-server.
Run your docker stack using the `docker compose up` command, and complete you *.env* file with the correct information,
so prisma can correctly connect to your newly created database.
Now that your containers are running,
run `npx prisma generate` and `npx prisma db push` to create the database tables and stuff.

PS: Hey, you know you just finished the database thing? You're all set-up on that side, well played!

### Step 4 — Clerk integration
First, you will need to install Clerk.
Run the `npm install @clerk/nextjs` command, go to your *app/layout.tsx* file and import ClerkProvider just like that:
```typescript
import { ClerkProvider } from '@clerk/nextjs'
```
Then enclose your whole application (return content) in `<ClerkProvider>(html, body, children...)</ClerkProvider>` tags.
Open your *.env* file and add the following lines:
```dotenv
# Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[...]
CLERK_SECRET_KEY=sk_test_[...]
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```
Your public and secret keys can be found be accessing/creating your Clerk application
(as their website is easy to understand, I will not detail creation steps here).

You can now create sign-in and sign-up routes, following this architecture:
```shell
app/(auth)/sign-in/[[...sign-in]]/page.tsx
app/(auth)/sign-up/[[...sign-up]]/page.tsx
app/(auth)/layout.tsx
```
I advise you to copy the content of those files directly from this repository.
The layout just centers the children that can be the sign-in or the sign-up page.
Now create a whole new *layout.tsx* file inside your *app/(site)/* folder, and copy the content from the repository.
Edit the *app/layout.tsx* file to remove the Sidebar element.
The two last steps allow you to not have the sidebar on the sign-in/sign-up pages.

We will now link clerk accounts with a database "Profile":
Create a new file *lib/initial-profile.ts* and fill it with a copy-paste form this repository.
Feel free to take some time to understand the code,
stolen from the discord-clone project as well (a lot of parts in this variant are).
To resume, the initialProfile() function will create a Profile for a user if it does not have one already,
or simply return the corresponding profile if it already exists.
Simply call this function in your *app/(site)/page.tsx* Home function like shown below:
```typescript
export default async function Home() {
  const profile = await initialProfile();
  
  // ...
}
```

### Step 5 — Some styling & shadcn
Run `npm i next-themes` to install the theme package.
Run `npx shadcn-ui@latest init` to initialize the shadcn package.
The initializer will ask you a few questions that you can answer with the default answer except for:
```zsh
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Gray
✔ Configure the import alias for components: … @/lib/shadcn-components
```
You now have to edit the *tailwind.config.ts* file to match your new *lib/shadcn-components/* folder emplacement,
the same goes for the *tailwind.config.js* file.

I removed the *bg-black* class name from the second div in the Sidebar component,
and added the dark mode feature from shadcn.
Start your shadcn adventure by running those two commands:
```zsh
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dropdown-menu
```

Now follow [those few steps](https://ui.shadcn.com/docs/dark-mode/next),
then once arrived at the "Add a mode toggle" section,
create a new file *lib/components/mode-toggle.tsx* and copy-paste the code given by shadcn.

***

To start and play with clerk user button and mode toggle, add the following in your *app/(site)/page.tsx* file:
```typescript
  // ...
  </Header>
    <p className='font-semibold text-5xl py-8 px-8'>
      This is a protected route.
      <UserButton afterSignOutUrl='/' /> // import { UserButton } from "@clerk/nextjs";
      <ModeToggle /> // import {ModeToggle} from '@/lib/components/mode-toggle';
    </p>
  <div className='mt-2 mb-7 px-6'>
  // ...
```
The ModeToggle will not toggle a great white mode, only the background will turn white for now, but don't worry!
The white mode will be a functionality in itself, that we will implement later.
