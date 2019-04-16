# MERN boilerplate | Ironhack Fullstack Application

- [Global information](#global-information)
- [Setups and execution of the project](#setups-and-execution-of-the-project)
- [How to implement a Full Stack feature?](#how-to-implement-a-full-stack-feature)
- [Example in the code](#example-in-the-code)
- [Deployement on Heroku](#deployement-on-heroku)
- [Guideline to create clean code](#guideline-to-create-clean-code)

## Set up and execution of the project

**To download the boilerplate and link it with your GitHub project**

(replace `<my-project>` and `<https://github.com/user/my-project.git>` by what you want, without `<` and `>`).

```sh
# Clone the project with only the last commit and save it in the folder <my-project>
$ git clone --depth=1 https://github.com/mc100s/mern-boilerplate.git <my-project>

$ cd <my-project>
$ rm -rf .git
$ git init

# Set your GitHub repository as the "origin" remote repository
$ git remote add origin <https://github.com/user/my-project.git>
```

### Files to add

You should have a `server/.env` file, with for example the following values:
```
PORT=5000
SESSION_SECRET=anyValue
MONGODB_URI=......
CLOUDINARY_CLOUD_NAME=......
CLOUDINARY_API_KEY=......
CLOUDINARY_API_SECRET=......
```


**To install all the packages**
```sh
# Install server and client packages + build the React applicatin
$ npm install

# OR you can install manually the server and client packages
$ (cd server && npm install)
$ (cd client && npm install)
```

**To install a package for the server**
```sh
$ cd server
$ npm install axios
```

**To install a package for the client**
```sh
$ cd client
$ npm install axios
```

**To run the server and the client**
```sh
# Open a first terminal
$ npm run dev:server
# Run the server on http://localhost:5000/

# Open a second terminal
$ npm run dev:client
# Run the client on http://localhost:3000/
```

So now you can go to 
- http://localhost:5000/api/: A simple API call
- http://localhost:5000/: The website based on client/build (that you can update with `$ (cd client && npm run build)`)
- http://localhost:3000/: The last version of your React application that is calling your API with the base url "http://localhost:5000/api/"



## Global information

### Directory structure
```
.vscode/
client/
    build/
    public/
    src/
        components/
            pages/
    package.json
server/
    bin/
    configs/
    models/
    passport/
    routes/
    app.js
    middlewares.js
    package.json
.gitignore
package.json
README.md
```



## How to implement a Full Stack feature?
1. Implement it in the sever by creating a route and some models if necessary
2. Test it with Postman with many different cases
3. Create a new API method in `client/src/api.js`
4. Consume the API method in your client :)

## Example in the code

### `server/routes/auth.js`

- `router.post('/signup')`: Route to create a new user
- `router.post('/login')`: Route to send the user JWT 
- `router.get('/secret')`: Route where the user need to be authenticated


### `server/routes/users.js`

- `router.get('/')`: Route to get all users
- `router.post('/first-user/pictures')`: Route to add a picture on one user with Cloudinary

<!-- TODO: give instructions for Cloudinary -->
<!-- TODO: give instructions for route guards -->

### `server/routes/countries.js`

- `router.get('/')`: Route to get all countries
- `router.post('/')`: Route to add a country



## Deployement on Heroku

### To deploy the first time

Create a project on Heroku.com. Here for the demo I named the project "my-ironhack-project". 

Then, you need to link your Git project with Heroku.

```sh
# Replace "my-ironhack-project" by the name of your Heroku project
$ heroku git:remote -a my-ironhack-project 
$ git push heroku master
```

Then you need to create a Mongo database online with MLab.

```sh
$ heroku addons:create mongolab:sandbox
```


### To redeploy

You just need to push on `heroku` (don't forget to commit before):
```sh
$ git push heroku master
```

### To execute a seed

If you want to execute something on the server, for example a seed, you can use `heroku run`.

Example:
```
$ heroku run node server/bin/seeds.js
```


### To Open MongoLab

You can either go on the Heroku project page ("Overview" tab) or type the following command:

```
$ heroku addons:open mongolab
```


### See the logs

```sh
$ heroku logs
```

## Guideline to create clean code

### Send the write status code

Your backend API sends some status code at every request. By default, it will send `200`, which means `OK`, everything went fine.

If something bad happened, you should a send a different status code:
- **`400` Bad Request**: Something is missing in wrong in the request (eg: missing data).
- **`401` Unauthorized**: For missing or bad authentication.
- **`403` Forbidden**: When the user is authenticated but isn’t authorized to perform the requested operation on the given resource.
- **`404` Not Found**: The resources/route doesn't exist.
- **`409` Conflict**: The request couldn't be completed because of a conflict (eg for signup: username already taken).
- **`500` Internal Server Error**: The server encountered an unexpected condition which prevented it from fulfilling the request.

By sending the write status code, you will catch more easily your error on the client side.

**Example on the server side**
```js
// If the user is not connected for a protected resource, we can send him this
res.status(401).json({ message: "You must be connected" })
```
**Example on the client side**
```js
// Call to api.getSecret()
//   In case of success, state.secret is saved
//   In case of error (status code 4xx or 5xx), state.message contains the message from the error
api.getSecret()
  .then(data => this.setState({ secret: data.secret }))
  .catch(err => this.setState({ message: err.toString() }))
```



<!-- TODO: find a way to check if we are still loggedIn when we load the application -->
