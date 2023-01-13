## start server

docker-compose run --rm --service-ports webpersonal npm start

## dev server

docker-compose run --rm --service-ports webpersonal npm run dev

## install

docker-compose run  webpersonal npm install package

## dependencys
docker-compose run webpersonal npm add bcryptjs
docker-compose run webpersonal npm add body-parser
docker-compose run webpersonal npm add cors
docker-compose run webpersonal npm add express
docker-compose run webpersonal npm add jsonwebtoken
docker-compose run webpersonal npm add nodemon
docker-compose run  webpersonal npm add mongoose@6.6.1
docker-compose run webpersonal npm add connect-multiparty
docker-compose run webpersonal npm add mongoose-paginate

