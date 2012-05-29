<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|  example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|  http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|  $route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|  $route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = "controller_index";
$route['404_override'] = '';

/* add api interface */
$route['api/(:any)/(:any)/(:any)/(:any)/(:any)'] = "api/controller_$1/$2/$3/$4/$5";
$route['api/(:any)/(:any)/(:any)/(:any)'] = "api/controller_$1/$2/$3/$4";
$route['api/(:any)/(:any)/(:any)'] = "api/controller_$1/$2/$3";
$route['api/(:any)/(:any)'] = "api/controller_$1/$2";
$route['api/(:any)'] = "api/controller_$1";
$route['api'] = "api/controller_index";

/* add admin interface */
$route['admin/(:any)/(:any)/(:any)/(:any)/(:any)'] = "admin/controller_$1/$2/$3/$4/$5";
$route['admin/(:any)/(:any)/(:any)/(:any)'] = "admin/controller_$1/$2/$3/$4";
$route['admin/(:any)/(:any)/(:any)'] = "admin/controller_$1/$2/$3";
$route['admin/(:any)/(:any)'] = "admin/controller_$1/$2";
$route['admin/(:any)'] = "admin/controller_$1";
$route['admin'] = "admin/controller_index";

/* normal controller routing */
$route['(:any)/(:any)/(:any)/(:any)/(:any)'] = "controller_$1/$2/$3/$4/$5";
$route['(:any)/(:any)/(:any)/(:any)'] = "controller_$1/$2/$3/$4";
$route['(:any)/(:any)/(:any)'] = "controller_$1/$2/$3";
$route['(:any)/(:any)'] = "controller_$1/$2";
$route['(:any)'] = "controller_$1";

/* End of file routes.php */
/* Location: ./application/config/routes.php */
