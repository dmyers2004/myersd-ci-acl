<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class controller_login extends MY_Controller {

	public function index() {
    $this->data['login'] = $this->auth->login_html();    
    $this->render();
	}
	
	public function login() {
	  $pass = $this->auth->login();
	  if ($pass !== FALSE) redirect('admin/');

    $this->flash_msg->red('Your login has failed. Please try again');
    redirect('login');
	}
	
	public function logout() {
    $this->auth->logout();
    redirect('login');
	}
		
} /* end controller */
