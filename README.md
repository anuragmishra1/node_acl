# Node with ACL

## To start the project follow below steps:

- Install NodeJS, if not installed (Require Node version >= 8.0.0)

```
	$ wget -qO- https://deb.nodesource.com/setup_10.x | bash -
	$ sudo apt-get install -y nodejs
```

- Install npm, if not installed (Require NPM version >= 6.0.0)

```
	$ sudo npm install -g yarn
```

- To build the application

```
	$ yarn
```

- Create .env file which should have these env variable [MONGO_URI, JWT_TOKEN].

- To run the application

```
	$ yarn start
```
