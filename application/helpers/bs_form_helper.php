<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

get_instance()->load->helper('form');

function bs_form_open($action = '', $attributes = '', $hidden = array()) {
  $attributes['class'] = (isset($attributes['class'])) ? $attributes['class'] .= ' form-horizontal well' : 'form-horizontal well';
  return form_open($action,$attributes,$hidden);
}

function bs_form_open_multipart($action = '', $attributes = array(), $hidden = array()) {
}

function bs_form_input($data = '', $value = '', $extra = '') {
  if (is_array($data)) $extra = $data;
  
  $title = $extra['title'];
  unset($extra['title']);

  $help = $extra['help'];
  unset($extra['help']);
  
  $extra['name'] = $data;
  $extra['value'] = $value;
  
  $html  = '<div class="control-group '.$data.'">';
  $html .= '<label class="control-label" for="'.$data.'">'.$title.'</label>';
  $html .= '<div class="controls">';
  $html .= form_input($extra);
  if (!empty($help)) {
    $html .= '<p class="help-block">'.$help.'</p>';
  }
  $html .= '</div>';
  $html .= '</div>';

  return $html;
}

function bs_form_password($data = '', $value = '', $extra = '') {
}

function bs_form_upload($data = '', $value = '', $extra = '') {
}

function bs_form_textarea($data = '', $value = '', $extra = '') {
}

function bs_form_multiselect($name = '', $options = array(), $selected = array(), $extra = '') {
}

function bs_form_dropdown($name = '', $options = array(), $selected = array(), $extra = '') {
}

function bs_form_checkbox($data = '', $value = '', $checked = FALSE, $extra = '') {
}

function bs_form_radio($data = '', $value = '', $checked = FALSE, $extra = '') {
}

function bs_form_submit($data = '', $value = '', $extra = '') {
}

function bs_form_button($data = '', $content = '', $extra = '') {
}

function bs_form_close($extra = '') {
  return '</form>';
}

function bs_legend($title,$attributes = array()) {
  return '<legend '._parse_form_attributes($attributes,array()).'>'.$title.'</legend>';
}