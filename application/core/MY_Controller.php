<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
  public $data = array();

  public function __construct() {
    parent::__construct();
		$this->router->class = substr($this->router->class,11);
	}

  public function render($view = NULL,$layout='bootstrap_nav') {
    $view = ($view == NULL) ? $this->router->class.'/'.$this->router->method : $view;
    $this->data['container'] = $this->load->view($this->router->directory.$view, $this->data, TRUE);
    $this->load->view('layouts/'.$layout, $this->data, FALSE);
  }
  
  public function partial($view = NULL) {
    return $this->load->view('partials/'.$view, $this->data, TRUE);
  }

}

class MY_Admin_controller extends MY_Controller {
	public function __construct() {
		parent::__construct();
		if ($this->auth->has_profile() !== TRUE) {
		  redirect('');
	  }
	}
}
