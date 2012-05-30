<?php
echo bs_form_open('test/form');
echo bs_legend('Welcome');
echo bs_form_input('firstname',$firstname,array('title'=>'First Name','class'=>'input-xlarge','help'=>'This is the helper'));



echo bs_form_close();
