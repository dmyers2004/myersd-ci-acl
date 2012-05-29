<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class controller_index extends MY_Controller {

	public function index() {    
    ob_start();

    echo '<a href="'.base_url().'login">Login</a>';

    echo '<pre>';
    $n = chr(10);

    echo 'Load All'.$n;
    print_r($this->m_user->get_all());
    
    echo $n.'Load by id 1'.$n;
    print_r($this->m_user->get_by(1));

    echo 'Load by name lmyers'.$n;
    print_r($this->m_user->get_by('lmyers'));

    echo 'Load by email dmyers@me.com'.$n;
    print_r($this->m_user->get_by('dmyers@me.com'));

    echo 'Load by email tyson@dog.com'.$n;
    print_r($this->m_user->get_by('tyson@dog.com'));
    
    echo '<br><br>';
    
    echo 'Login as dmyers@me.com'.$n;
    $bol = $this->auth->login('dmyers@me.com','password');
    $this->bol($bol);

    echo $n.'Login as lmyers@me.com'.$n;
    $bol = $this->auth->login('lmyers@me.com','password');
    $this->bol($bol);

    echo $n.'Login as tyson@me.com'.$n;
    $bol = $this->auth->login('tyson@me.com','password');
    $this->bol($bol);

    echo $n.'Request a Forgot Key';
    $fkey = $this->m_user->forgot_password('dmyers@me.com');
    echo $n.'Forgot Key: '.$n.$fkey.$n;
    
    $change = $this->m_user->check_forgot_password($fkey);
    echo 'See if Forgot Key is good'.$n;
    $this->bol($change);
        
    echo $n.'Try to Change the password based on that key'.$n;
    $bol = $this->m_user->check_forgot_password($fkey,'new password');
    $this->bol($bol);
    $profile = $this->m_user->get_by('dmyers@me.com');
    print_r($profile);

    echo $n.$n;

    $this->m_user->get_by(1,TRUE,TRUE);
    
    echo $n.'Request Remember Me me Key'.$n;
    $rkey = $this->m_user->set_remember_me($this->profile->id,FALSE);
    echo $rkey.$n;
    echo $n.'Try to load a profile based on that key'.$n;
    $user_id = $this->m_user->check_remember_me($rkey);
    echo 'user id '.$user_id.$n;
    $profile = $this->m_user->get_by($user_id);
    print_r($profile);
    
    echo $n.'Not Max Tries for amyers@me.com'.$n;
    $bol = $this->m_user->not_max_tries('amyers@me.com');
    $this->bol($bol);
    
    if ($bol === false) {
      echo 'Try to reset tries'.$n;
      $bol = $this->m_user->tries_reset('amyers@me.com');
      $this->bol($bol);
    }
  
    echo $n.'Activate Email '.$n;
    $akey = $this->m_user->email_activate('amyers@me.com');
    echo $akey.$n;
    
    echo 'Test Activation '.$n;
    $bol = $this->m_user->check_email_activate('amyers@me.com',$akey);
    $this->bol($bol);    
 
   echo $n.'*** User Roles'.$n.$n;

        
    $this->m_user->get_by(3,TRUE,TRUE);
    print_r($this->profile);
    
    $this->test('*');
    $this->test('window b');
    $this->test('window x');
    $this->test('window b|back door');
    $this->test('window b&back door');
    $this->test('garage door&back door');
    $this->test('window*');
    $this->test('back*');
    $this->test('back porch*');
    $this->test('garage door&back door');
    $this->test('garage door|back door');
    $this->test('garage door|back*');
    $this->test('garage*|back porch');

    $this->m_user->get_by(4,TRUE,TRUE);
    print_r($this->profile);
    
    $this->test('*');
    $this->test('window b');
    $this->test('window x');
    $this->test('window b|back door');
    $this->test('window b&back door');
    $this->test('garage door&back door');
    $this->test('window*');
    $this->test('back*');
    $this->test('back porch*');
    $this->test('garage door&back door');
    $this->test('garage door|back door');
    $this->test('garage door|back*');
    $this->test('garage*|back porch');
    
    echo 'Try to load tyson@horse.com'.$n;
    $this->m_user->get_by('tyson@horse.com',TRUE,TRUE);
    print_r($this->profile);

    $this->test('*');
    $this->test('window b');
    $this->test('window x');
    $this->test('window b|back door');
    $this->test('window b&back door');
    $this->test('garage door&back door');
    $this->test('window*');
    $this->test('back*');
    $this->test('back porch*');
    $this->test('garage door&back door');
    $this->test('garage door|back door');
    $this->test('garage door|back*');
    $this->test('garage*|back porch');

    $this->data['container'] = ob_get_contents();
    ob_end_clean();

    die($this->data['container']);
	}
	
	public function test($role) {
	  echo $role.' ';
      $bol = $this->auth->has_role($role);
	  $this->bol($bol);
	}
	
	public function bol($bol) {
	  if ($bol == true) echo '<span style="color:#8FC786"><b>TRUE</b></span>';
	  else echo '<span style="color:#B47C7E"><b>FALSE</b></span>';
	  echo chr(10);
	}
	
} /* end controller */
