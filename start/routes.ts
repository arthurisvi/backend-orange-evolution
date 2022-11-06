/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {

    Route.group(() => {
      Route.get("getAll", "ContentsController.index");
      Route.get("show/:id", "ContentsController.show");
      Route.get("filter", "ContentsController.filterContents");
      Route.get('initialContents', "ContentsController.getInitialContents");

      Route.group(() => {
        Route.post("create", "ContentsController.store");
        Route.put("update/:id", "ContentsController.update");
        Route.delete("delete/:id", "ContentsController.destroy");
      }).middleware("userAdmin");

    }).prefix("content");

    Route.group(() => {
      Route.get('getAll', 'TrailsController.index')
      Route.get('getContents/:id', 'TrailsController.getContents')
    }).prefix("trail");

    Route.group(() => {
      Route.get('show/:id', 'UsersController.show')
      Route.get('getTrails/:id', 'UsersController.getTrails')
      Route.get(':id/contentTrail', 'UsersController.getAssociatedContentByTrail')
      Route.get('favoritedContents', 'UsersController.getFavoriteContents')
      Route.post('signTrail', 'UsersController.signTrail')
      Route.patch('contentStatus', 'UsersController.setContentStatus')
      Route.patch('favoriteContent', 'UsersController.setFavoriteContent')
    }).prefix("user")

  }).middleware("auth:api");

}).prefix("api")
