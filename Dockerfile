FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN ["npm", "install"]
COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]
