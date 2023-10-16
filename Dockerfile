FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

WORKDIR /app/src

# Expose the application's port (if needed)
EXPOSE 3000

CMD [ "nodemon", "app.js" ]
