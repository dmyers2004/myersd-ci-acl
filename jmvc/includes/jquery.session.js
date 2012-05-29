/**
 * jQuery MVC Framework for Client Side Interaction
 *
 * @package jQueryMVC
 * @license Creative Commons Attribution License http://creativecommons.org/licenses/by/3.0/legalcode
 * @link
 * @version 0.0.4
 * @author Don Myers donmyers@mac.com
 * @copyright Copyright (c) 2010
 * requires jquery 1.4.2+ and jquery.cookie.js
*/
jQuery.session_start = function() {
  /* setup if not alreay setup or push forward 1 year if it is */
  if (!jQuery.cookie("mvc_uuid")) {
    jQuery.cookie("mvc_uuid", (new Date().getTime()) + '-' + jQuery.uid(), { expires: 365, path: '/' });
  } else {
    jQuery.cookie("mvc_uuid", jQuery.cookie("mvc_uuid"), { expires: 365, path: '/' });
  }

  /* set the browser session */
  if (!jQuery.cookie("mvc_sessionid")) {
    jQuery.cookie("mvc_sessionid", jQuery.uid(), { path: '/' });
  }

  /* let's read and cache our session data */
  var jsontxt = jQuery.cookie("mvc_session");
  if (!jsontxt) {
    window.mvc_session = {};
  } else {
    window.mvc_session = jQuery.secureEvalJSON(jsontxt);
  }
  
  return jQuery.cookie("mvc_sessionid");
};

jQuery.session_uuid = function() {
  return jQuery.cookie("mvc_uuid");
};

jQuery.session_id = function() {
  return jQuery.cookie("mvc_sessionid");
};

jQuery.session_regenerate_id = function(delete_old_session) {
  if (delete_old_session) {
    jQuery.cookie("mvc_session", null, { path: '/' });
  }
  jQuery.cookie("mvc_sessionid", jQuery.mvcUUID(),{ path: '/' });
  return true;
};

jQuery.session_destroy = function() {
  jQuery.cookie("mvc_sessionid", null,{ path: '/' });
  jQuery.cookie("mvc_session", null,{ path: '/' });
  return true;
};

jQuery.session = function(name, value) {
  /* cached in window object */
  if (!name && !value) {
    return window.mvc_session;
  } else if (!value) {
    return window.mvc_session[name];
  } else {
    window.mvc_session[name] = value;
    jQuery.cookie("mvc_session",jQuery.toJSON(window.mvc_session),{ path: '/' });
    return true;
  }
};

