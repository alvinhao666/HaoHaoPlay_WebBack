FROM node:12.18-alpine AS builder
# set working directory 
# /app这个不用修改
WORKDIR /app

# install and cache app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

# build the angular app
COPY . .
RUN npm run build
FROM nginx:1.18.0-alpine

# copy from dist to nginx root dir，
#file-system需要用你的项目名字替换
COPY --from=builder /app/dist/haohaoplaywebback  /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx in foreground
# https://stackoverflow.com/questions/18861300/how-to-run-nginx-within-a-docker-container-without-halting
CMD ["nginx","-g","daemon off;"]