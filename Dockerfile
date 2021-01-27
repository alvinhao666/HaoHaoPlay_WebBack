FROM node:14.13-buster AS builder

# install and cache app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./tmp/"]
RUN cd /tmp  && RUN npm config set registry https://registry.npm.taobao.org && cnpm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
COPY . /opt/app

# build the angular app
RUN npm run build
FROM nginx:1.18.0

# copy from dist to nginx root dir，
#file-system需要用你的项目名字替换
COPY --from=builder /app/dist/haohaoplaywebback  /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
# expose port 80
EXPOSE 80

# run nginx in foreground
# https://stackoverflow.com/questions/18861300/how-to-run-nginx-within-a-docker-container-without-halting
CMD ["nginx","-g","daemon off;"]