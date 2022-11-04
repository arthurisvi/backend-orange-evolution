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
    Route.get("getAll", "ContentsController.index");
    Route.post("create", "ContentsController.store");
    Route.get("show/:id", "ContentsController.show");
    Route.put("update/:id", "ContentsController.update");
    Route.delete("delete/:id", "ContentsController.destroy");
    Route.get("filter", "ContentsController.filterContents");
  }).prefix("content");

  Route.group(() => {
    Route.get('getAll', 'TrailsController.index')
    Route.get('getContents/:id', 'TrailsController.getContents')
  }).prefix("trail");

  Route.group(() => {
    Route.get('show/:id', 'UsersController.show')
    Route.get('getTrails/:id', 'UsersController.getTrails')
    Route.post('signTrail', 'UsersController.signTrail')
    Route.post('setContentStatus', 'UsersController.setContentStatus')
  }).prefix("user")
  // Route.group(() => {

  // }).middleware("auth:api");

}).prefix("api");
