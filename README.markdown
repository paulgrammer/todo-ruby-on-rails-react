## Setup

The app should run on any modern version of Ruby, with Bundler.

```sh
bundle install

rails db:create

rails db:migrate

yarn install

yarn build && yarn build:css

bundle exec rails server

For development to watch changes just run below command
bin/dev

# browse to localhost:3000

bundle exec rspec
```

Alternatively, you can use docker-compose:

```sh
docker compose build

docker compose up
# browse to localhost:3000

docker compose exec web rspec
```
