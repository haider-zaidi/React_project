FROM node:18

WORKDIR /app

# Install dependencies
COPY . .

RUN npm install

# Expose React's dev server port
EXPOSE 3000

# Start the dev server
CMD ["npm", "run", "start"]