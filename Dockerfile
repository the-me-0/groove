FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#nginx
#RUN apk add --no-cache nginx
# Configure nginx - http
#COPY nginx-config/nginx.conf /etc/nginx/nginx.conf
# Configure nginx - default server
# Robot.txt file
#COPY nginx-config/robots.txt /app/www/robots.txt
# SSL certificates copy
#RUN mkdir /etc/nginx/certificates
#COPY nginx-config/certificates/cert.pem /etc/nginx/certificates/cert.pem
#COPY nginx-config/certificates/chain.pem /etc/nginx/certificates/chain.pem
#COPY nginx-config/certificates/privkey.pem /etc/nginx/certificates/privkey.pem
# SSL certificates check
#RUN \
#  if ! [ -f /etc/nginx/certificates/cert.pem ]; then echo "cert.pem not found" && exit 1; \
#  elif ! [ -f /etc/nginx/certificates/chain.pem ]; then echo "chain.pem not found" && exit 1; \
#  elif ! [ -f /etc/nginx/certificates/privkey.pem ]; then echo "privkey.pem not found" && exit 1; \
#  fi

# Create www songs & images directory
# We copy the prisma folder to have access to the migrations
COPY --from=builder /app/prisma ./prisma
# We copy the public folder into our www folder
#COPY --from=builder /app/public ./www # We don't need this anymore

# dotenv is needed
RUN npm install -g dotenv-cli
# sharp is needed in production https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm install sharp
# Prisma is needed
RUN npm install prisma@5.8.1

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs ./private/images ./private/images
COPY --chown=nextjs:nodejs ./private/songs ./private/songs

# Make sure files/folders needed by the processes are accessable when they run under the nobody user
RUN chown -R nextjs.nodejs /app /run

USER nextjs

# We run nextjs app on 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD sh -c "npm run migrate-prod; node server.js"