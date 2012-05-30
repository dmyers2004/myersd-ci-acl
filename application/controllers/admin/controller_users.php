<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class controller_users extends MY_Admin_controller {

  /* view */
  public function index() {
    $this->load->helper('bs_form');
  
    $this->render();
  }

  public function edit($id=NULL) {
  
  }
  
  public function upsert($id=NULL) {
  
  }

} /* end class */
