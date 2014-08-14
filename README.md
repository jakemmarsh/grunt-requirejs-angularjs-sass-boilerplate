grunt-requirejs-angularjs-SASS-boilerplate
=====================================

**Note: I highly recommend using my [angularjs-gulp-browserify-boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate) in place of this one.**

---

A boilerplate for Grunt, RequireJS, AngualrJS, and SASS.

---

This boilerplate uses the latest versions of the following libraries:

- [Grunt](http://gruntjs.com/)
- [RequireJS](http://requirejs.org/)
- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)

---

### RequireJS

RequireJS is a Javascript file and module loader. In this boilerplate, it is used to organize all the frontend dependencies. In addition, it is utilized by Grunt to create a minified Javascript file for your project (discussed in the Grunt section, below).

##### AngularJS Dependency Injection

In order for RequireJS and the minification to function properly, all your AngularJS dependencies must be declared and injected in the following manner:

```
controllers.controller('exampleCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.test = [1, 2, 3];

}]);
```

Note the dependencies being first declared within the square brackets, and then injected as parameters in the function declaration.

##### Adding New Files

As you add new files to your project such as controllers, services, etc., you must also add them into the `impl.js`. Some example files in the project can be seen in this file already.

---

### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this boilerplate, it is used for all the application routing as well as all of the frontend views and logic.

##### File Organization

The AngularJS files are divided up into folders based on their function. These folders are:

- animations
- controllers
- directives
- filters
- services
- partials
- templates

All of these folders contain an `index.js` file, which serves as the 'parent' for all files contained within that folder. All new files added must be declared based upon their respective `index.js` file. Each folder mentioned above contains examples.

###### Partials and Templates

Partials are like the views for your application. These will all be placed in the `partials` directory, and associated with a route and controller in `routes.js`.

Templates, on the other hand, are like small modules that can be used on multiple pages. These could include things like a user profile card, etc.

Although these can both be loaded with a separate HTTP call upon each page load, this boilerplate includes a Grunt task to minify them and include them in the Javascript upon initial page load (discussed later in the Grunt section).

###### Adding New AngularJS Modules

If at any point you add additional AngularJS libraries or modules, these must first be added in `main.js` to make RequireJS aware (unless you refer to them specifically by their location path). From there, they must be injected into the application in `app.js` (either by the identifier declared in `main.js`, or their full path).

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a very simple file directory structure for SASS files, as well as basic files to get you started with the styles for your project. Variables such as colors, spacing, and mixins are declared in `_vars.scss`, while all files must be imported into `style.scss` since this is the file used for compilation. A Grunt task is provided for compilation and minification of the stylesheets, discussed in the Grunt section below.

---

### Grunt

Grunt is a Javascript task running library. In this boilerplate, we are using it for four main things:

##### Compiling and Minifying SASS

This Grunt task will take the `style.scss` file from within the CSS directory and undergo the necessary processes to compile it into CSS. In addition, it will minify it into a production-ready `style.min.css` file within the same directory. This task can be run with the command `grunt sass`.

##### Compiling and Minifying Partials and Templates

As mentioned previously, this task will compile all partials and templates from their respective directories into a Javascript file that can be minified and injected into the project. This reduces HTTP calls and load times as users navigate your application. This task can be run with the command `grunt ngtemplates`.

##### Compressing Images

This boilerplate utilizes a Grunt library called `imagemin` in order to efficiently compress any images within the project. This task will search the entire `/public/img` directory, and take any steps possible to losslessly reduce the file size of any images found. This task can be run with the command `grunt imagemin`.

##### Minifying Javascript Into a Single File

As mentioned previously in the RequireJS section, RequireJS also allows us to properly minify our Javascript while maintaining dependencies. This is possible due to their `R.js` library. This will collect all properly injected and referenced JS files, and compile them into a single `main.min.js` file, which is the file referenced by this boilerplate in `index.html`. This task can be run with the command `grunt requirejs`.

##### 'Watching' All Files

A Grunt task is also included, called `Watch`, in order to watch the partials, templates, scripts, and styles. If it detects a change to any file at any point, it runs the necessary compilation or minification tasks. In order to run this, use the command `grunt watch`.

---

### Running the Boilerplate

Before being able to run any of the relevant processes, take the following steps:

1. Clone this repo from `https://github.com/jakemmarsh/grunt-requirejs-angularjs-boilerplate.git`
2. Run `npm install` from the directory
3. Run `bower install`

##### Grunt

Most of the Grunt tasks, and how to run them, are described in the Grunt section above. However, there are two other ways to run multiple tasks at once:

1. `grunt` will run the dev tasks, which include SASS compilation, Partials/Templates compilation, and Javascript compilation/minification
2. `grunt prod` will run the dev tasks mentioned above, while also running the `imagemin` task

##### Server

An incredibly simple NodeJS + Express server is included in this project. An alias is provided so that using the command `npm start` from the command line while in the directory will automatically serve the project to `localhost:8000` via [Supervisor](https://github.com/isaacs/node-supervisor).
