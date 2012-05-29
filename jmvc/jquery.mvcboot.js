/**
 * jQuery MVC Framework for Client Side Interaction
 *
 * @package jQueryMVC
 * @license Creative Commons Attribution License http://creativecommons.org/licenses/by/3.0/legalcode
 * @link
 * @version 0.0.4
 * @author Don Myers donmyers@mac.com
 * @copyright Copyright (c) 2010
*/
/* MUST load jquery 1.4.2+ */

var mvc = (mvc) || {};

/* mvc settings */

/* Domain */
mvc.domain = 'http://localhost/acl'; /* WITHOUT trailing slash */

/* Folder (if any) */
mvc.folder = ''; /* WITHOUT trailing slash */

/* which segment is the name of the controller (hint: the host is #2) */
mvc.controller_seg = 4;

mvc.config = {};

/*
the extension to append to all javascript file calls (usually .js or .min.js) 
don't forget to set single to true below
*/
mvc.config.ext = '.js';

/* if you compressed your application set this to true so it loads the libs all at once as jquery.mvc.single.min.js */
mvc.config.single = false;

/* the ajax settings */
mvc.ajax = {};

/* setup rest server settings for models and such */
mvc.rest = {};

/* location of the rest server from mvc.folders.path WITH trailing slash */
mvc.rest.url = mvc.domain + '/restserver/';

/* defaults */
mvc.ajax.http_auth = false;
mvc.ajax.auth_user = '';
mvc.ajax.auth_pw = '';

/* that is most of the normal config stuff there is more advanced in the jquery.mvc.js file */

/* load everything else */
jQuery.getScript('jmvc/includes/jquery.mvc' + ((mvc.config.single) ? '.single' : '') + mvc.config.ext);
