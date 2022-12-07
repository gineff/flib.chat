FROM node:18.8.0
WORKDIR /var/www
COPY package*.json ./
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
CMD npm run start
