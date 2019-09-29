/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// INITIAL ROUTE
Route.get('/', () => {
    return 'Hello, welcome to api-acg.';
});

// STORE ROUTES
Route.post('/sessions', 'SessionController.store').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.store').validator('Reset');
Route.post('/users', 'UserController.store').validator('StoreUser');

Route.group(() => {
    Route.resource('users', 'UserController').apiOnly();

    Route.resource('caps', 'CapController')
        .apiOnly()
        .validator(new Map([['caps.store', 'StoreCap']]));
}).middleware('auth');
