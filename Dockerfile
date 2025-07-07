######################################################################
#  STAGE 1  –  build React client
######################################################################
FROM node:20-alpine AS client-build
WORKDIR /client

# -- Copy only manifests first (layer‑cache friendly)
COPY client/package.json client/package-lock.json ./

# -- Install prod + build deps for CRA
RUN npm ci

# -- Copy the rest of the source and build
COPY client/ .
RUN npm run build     # outputs → /client/build
#  └─ If you ever use Vite: replace with  npm run build --if-present

######################################################################
#  STAGE 2  –  build Express server
######################################################################
FROM node:20-alpine AS server-build
WORKDIR /app

# -- Copy backend manifests & install only prod deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# -- Copy server source
COPY server/ ./server/

# -- Bring in compiled React static files
COPY --from=client-build /client/build ./server/public

######################################################################
#  STAGE 3  –  tiny runtime image
######################################################################
FROM node:20-alpine
WORKDIR /app

# -- Copy prepared application from previous stage
COPY --from=server-build /app /app

# Railway will inject PORT=8080 automatically
ENV NODE_ENV=production
# purely informational
EXPOSE 8080      

CMD ["node", "server/server.js"]
