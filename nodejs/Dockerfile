FROM node:20-alpine
#chuẩn bị môi trường nodejs, version node14/alpine

WORKDIR /lee/backend
#thư mục để lưu trữ code

COPY package*.json ./
# * nghĩa là copy cả file package-lock.json và package.json vào Docker

RUN npm install

RUN npm install -g @babel/core  @babel/cli

COPY . .
# thực hiện copy các file còn lại, dấu chấm đầu tiên là các file cùng thư mục với file Dockerfile, dấu chấm thứ 2 là copy vào thư mục hiện tại nơi mà định nghĩa workdir

RUN npm run build-src

CMD ["npm","run","build"]
#chạy câu lệnh npm run build 

#docker build --tag node-docker .
#docker run -p 8080:8080 -d node-docker


