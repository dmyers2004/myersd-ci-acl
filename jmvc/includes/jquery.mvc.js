/**
 * jQuery MVC Framework for Client Side Interaction
 *
 * @package jQueryMVC
 * @license Creative Commons Attribution License http://creativecommons.org/licenses/by/3.0/legalcode
 * @link
 * @version 0.0.4
 * @author Don Myers donmyers@mac.com
 * @copyright Copyright (c) 2010
 * requires jQuery 1.4.3+
*/

/* other config stuff */

/* setup folders */
mvc.folders = {};

/* complete path */
mvc.folders.path = mvc.domain + mvc.folder + '/';

/* name of the folder containing the mvc javascript files WITH trailing slash */
mvc.folders.application = 'jmvc/';

/* location of root */
mvc.folders.root = mvc.folders.path + mvc.folders.application;

/* location of the controllers WITH trailing slash */
mvc.folders.controller = mvc.folders.root + 'controllers/';

/* location of the models WITH trailing slash */
mvc.folders.model = mvc.folders.root + 'models/';

/* location of the includes WITH trailing slash */
mvc.folders.include = mvc.folders.root + 'includes/';

/* location of the views WITH trailing slash */
mvc.folders.view = mvc.folders.root + 'views/';

/* reference to self this is also used for the controller so convert a few characters here */
mvc.folders.mvc = location.href.replace(/#/g,'').replace(/-/g,'_');

/* mvc ajax defaults */
mvc.ajax.options = {
  type: 'post', /* ajax default request method */
  dataType: '', /* request return type */
  async: false, /* leave this on */
  cache: false, /* should ajax requests be cached - should be false */
  timeout: 3000, /* we uses a few blocking ajax calls how long should we wait? */
  data: {} /* default data sent */
};

/* ajax returned responds */
mvc.ajax.responds = null;
mvc.ajax.error = {};

/* setup form validation (in jquery.mvcform.js file) */
mvc.validation = {};

/* append to the form element's action attribute action="/post/here" = url="/post/here_validate" - form element url if no URL provied */
mvc.validation.append2url = '_validate';

/* auto merge json on form validation pass or fail - this could be used to show errors etc... supplied in the returned JSON */
mvc.validation.merge = true;

/* If the form validates as passed do we auto submit it? */
mvc.validation.autosubmit = true;

/* setup views */
mvc.views = {};

/* view extension */
mvc.views.extension = '.tmpl';

/* get URL into parts */
mvc.segs = mvc.folders.mvc.split('/');

mvc.folder = (mvc.segs[mvc.controller_seg] === '' || mvc.segs[mvc.controller_seg] === undefined) ? 'index' : mvc.segs[mvc.controller_seg];
mvc.file = (mvc.segs[mvc.controller_seg+1] === '' || mvc.segs[mvc.controller_seg+1] === undefined) ? 'index' : mvc.segs[mvc.controller_seg+1];

/* setup default controller + method */
mvc.controller = mvc.folder + '/' + mvc.file;

/* auto load everything including starting the router */
mvc.config.autoload = true;

/* in the attached javascript object the constructor is called the */
mvc.config.constructor = '__construct';

/* example var controller_jstorage_method_index = new function() { */

/* appended to the controller name in the controller js file */
mvc.config.controller = 'controller_';

/* appened to the method name in the contoller js file */
mvc.config.method = '_method_';

/* allow console output (if present) */
mvc.config.debug = true;

/* if a element has a method add this css cursor by default */
mvc.config.cursor = 'pointer';

/* name of the libraries to auto include */
mvc.config.include = ['jquery.mvcmodel','jquery.mvcform','jquery.session','third_party/jquery.tmpl','third_party/jquery.cookie','third_party/jquery.json-2.2','third_party/jstorage','third_party/base64']; /*  */

/* holds jquery "this" that called the function for function calls object (actually contains data as well)*/
mvc.event = null;
mvc.eventObject = null;

/* holds the data for function calls json */
mvc.data = null;

mvc.objs = {};
mvc.loaded = [];

/* the router */
jQuery.mvc = function (name,func) {
  /* set up segs for user */
  for (var idx=0;idx<=(mvc.controller_seg + 1);idx++) {
    mvc.segs.shift();
  }

  /* did they send in just a function? if so then the controller is mvc.controller */
  if (typeof(name) === 'function') {
    func = name;
    name = mvc.controller;
  } else {
    /* else if they didn't send in any thing then the controller is mvc.controller */
    name = (!name) ? mvc.controller : name;
  }

  jQuery.log(name,mvc.folder,mvc.file,mvc.segs);

  /* load the required includes from inside the jmvc folder */
  if (!mvc.config.single) {
    for (var i=0, len = mvc.config.include.length; i<len; ++i) {
      jQuery.mvcAjax({url: mvc.folders.include + mvc.config.include[i] + mvc.config.ext, dataType: 'script', cache: true, async: true });
    }
  }

  /* after the ajax is done. load a controller and try to run it. */
  jQuery(document).one('ajaxStop', function() {
    jQuery.mvcController(name,func);
  });
};

/*
console logging function if exists and debug is on
IE (no console) safe
Load it here this way it's available before the includes are loaded incase we want to log something
*/
jQuery.log = function () {
  /* unlimited arguments */
  if (mvc.config.debug) {
    if (typeof window.console === 'object' && typeof window.console.log !== 'undefined') {
      for (var idx = 0; idx < arguments.length; idx++) {
        console.log(arguments[idx]);
      }
    }
  }
};

/*
$.mvcController(name);
  load controller based on controller/method

$.mvcController(name,func);
  load controller based on controller/method
  run function or string when finished

*/
jQuery.mvcController = function (name, func) {
  var segs = name.split('/');
  var clas = segs[0];
  var meth = segs[1];
  var complete_name = mvc.config.controller + clas + mvc.config.method + meth; /* controller_index_method_index */

  jQuery.log(mvc.folders.controller + clas + '/' + meth + mvc.config.ext,complete_name);
  jQuery.mvcAjax({url: mvc.folders.controller + clas + '/' + meth + mvc.config.ext, dataType: 'script', cache: true, async: false });

  // if there is now a controller object run it.
  if (window[complete_name]) {
    var ctrlr = window[complete_name];
    /* fire off construct */
    jQuery.exec(ctrlr[mvc.config.constructor]);
    for (var elementid in ctrlr) {
      if (typeof(ctrlr[elementid]) === 'object') {
        for (var eventname in ctrlr[elementid]) {
          if (typeof(ctrlr[elementid][eventname]) === 'function') {
            /* data-mvc is now automagically attached via jquery 1.4.3+ */
            /* attach any events to matching classes and/or ids */
            jQuery('#' + elementid).mvcEvent(eventname,complete_name + '.' + elementid + '.' + eventname + '();');
            jQuery('.' + elementid).mvcEvent(eventname,complete_name + '.' + elementid + '.' + eventname + '();');
          }
        }
      }
    }
  }

  /* fire off any when complete code sent in */
  jQuery.exec(func);
};

/*
attach a even and data to a item
$("#id").mvcAction('click',function() { alert('welcome'); }, {});
event = click,mouseover,change,keyup
func = indexController.action1.click() or func = function() { alert('welcome'); };
optional
data = json object
*/
jQuery.fn.mvcAction = function (event, func, data) {
  if (data) {
    jQuery(this).mvcData(data);
  }
  jQuery(this).mvcEvent(event,func);
};

/*
var output = jQuery.mvcView('template',movies);

Get view template, compile it, and phrase it.
name = name of the template file to load - also used as the name of the compiled template
data = phrase into the template
*/
jQuery.mvcView = function (name,data) {
  // jQuery template stores them in .template[name] so let's see if there have one named?
  if (!jQuery.template[name]) {
    // get the template
    var template = jQuery.mvcAjax({url: mvc.folders.view + name + mvc.views.extension + mvc.config.ext, dataType: 'html'});
    template = (typeof(template) === 'string') ? template : ' ';
    jQuery.template(name,template);
  }

  // phrase and render the template
  return jQuery.tmpl(name,data);
};

/*
replace
jQuery('#movieList2').mvcView('logic',movies);
*/
jQuery.fn.mvcView = function (name,data) {
  // phrase and render the template
  jQuery(this).html(jQuery.mvcView(name,data));
};

/*
load json properties into html based on matching selectors
matches on id,class,form element name
will also run scripts mvc_pre_merge and mvc_post_merge
*/
jQuery.mvcMerge = function (json) {
  if (json) {
    jQuery.exec(json.mvc_pre_merge);
    for (var property in json) { /* we are only using strings or numbers */
      if (typeof(json[property]) === 'string' || typeof(json[property]) === 'number' || typeof(json[property]) === 'boolean') {
        var value = json[property];

        /* match classes & ids */
        jQuery('.' + property + ',#' + property).html(value);

        /* match any form element names */
        /* hidden field */
        if (jQuery('[name=' + property + ']').is('input:hidden')) {
          jQuery('input[name=' + property + ']').val(value);
        } /* input text */
        if (jQuery('[name=' + property + ']').is('input:text')) {
          jQuery('input[name=' + property + ']').val(value);
        } /* input textarea */
        if (jQuery('[name=' + property + ']').is('textarea')) {
          jQuery('textarea[name=' + property + ']').val(value);
        } /* input radio button */
        if (jQuery('[name=' + property + ']').is('input:radio')) {
          jQuery('input[name=' + property + '][value="' + value + '"]').attr('checked', true);
        } /* input checkbox */
        if (jQuery('[name=' + property + ']').is('input:checkbox')) {
          jQuery('input:checkbox[name=' + property + ']').attr('checked', (value === 1 || value === true));
        } /* input select */
        if (jQuery('[name=' + property + ']').is('select')) {
          jQuery('select[name=' + property + ']').val(value);
        }
      }

    }
    jQuery.exec(json.mvc_post_merge);
  }
};

/*
Getters
return complete mvc data object
var value = $("#selector").mvcData(); (returns object)

return specific value
var value = $("#selector").mvcData("age"); (return value or undefined)

Setters
$("#selector").mvcData({}); (clears it out)

$("#selector").mvcData("name","value");
*/
jQuery.fn.mvcData = function (name, value) {
    var temp;

    /* GET return Object if both empty */
    if (!name && !value) {
      return jQuery(this).data('mvc');
    }
    /* SET if name is a object */
    if (typeof(name) === 'object') {
      jQuery(this).data('mvc',name);
      return true;
    }
    /* GET if value is empty then they are asking for a property by name */
    if (!value) {
      var rtn;
      temp = jQuery(this).data('mvc');
      if (temp) {
        rtn = temp[name];
      }
      return rtn;
    }
    if (name && value) {
      /* SET if name & value set */
      temp = jQuery(this).data('mvc');
      if (temp) {
        temp[name] = value;
        jQuery(this).data('mvc',temp);
        return true;
      }
      return false;
    }
};

/*
Generic Event Set/Get

var events = $("#mvcClick").mvcEvent(); - get all the events

var bol = $("#mvcClick").mvcEvent('click'); - does it have this event?

$("#mvcClick").mvcEvent('click',{}); - clear click even

var func = function() { alert("Attached a new event"); };
$("#mvcClick").mvcEvent('mouseover',func); - attach a function

$('#mvcClick").mvcEvent('click',function() { alert('event') });

*/
jQuery.fn.mvcEvent = function (event, func) {
  var id;
  var events;

  if (typeof(event) === 'object' && !func) {
    /* SET clear all */
    jQuery(this).die().css('cursor', '');
    return true;
  }

  if (!event && !func) {
    /* GET return all events */
    id = this.selector;
    events = [];

    jQuery.each(jQuery(document).data('events').live, function (name,value) {
      if (value.selector === id) {
        if (event !== '' && value.origType === event) {
          events.push(value.origType);
        } else if (!event)  {
          events.push(value.origType);
        }
      }
    });

    return events;
  }

  if (event && !func) {
    /* GET does event exist */
    id = this.selector;
    events = [];
    jQuery.each(jQuery(document).data('events').live, function (name,value) {
      if (value.selector === id) {
        if (event !== '' && value.origType === event) {
          events.push(value.origType);
        } else if (!event)  {
          events.push(value.origType);
        }
      }
    });
    return (events.length !== 0);
  }

  if (event && typeof(func) === 'object') {
    /* SET clear function */
    jQuery(this).die(event);
    return true;
  }

  if (event && func) {
    /* SET event and function */
    jQuery(this).live(event,function (e) {
      mvc.event = jQuery(this);
      mvc.eventObject = e;
      var dd = jQuery(this).data('mvcdata');
      mvc.data = (!dd) ? {} : dd;
      jQuery.exec(func);
    }).css('cursor', mvc.config.cursor);
    return true;
  }

};

/*
execute code
function or string
*/
jQuery.exec = function (code) {
  if (code !== '' || code !== undefined) {
    var func = (typeof(code) === 'function') ? code : new Function(code);
    try {
      func();
    } catch (err) {
      jQuery.log('MVC jQuery.exec ERROR',err,code);
    }
  }
};

/*
client based redirect
*/
jQuery.redirect = function (url) {
  window.location.replace(url);
};

/*
Does this object exist in the DOM?
if ($("#selector).exists) {
  do something
}
*/
jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

/*
create a wrapper for $.postJSON(); - uses post instead of get as in $.getJSON();
*/
jQuery.extend({
  postJSON: function (url, data, callback) {
    return jQuery.post(url, data, callback, 'json');
  }
});

/*
More complete Ajax
$.mvcAjax({});
*/
jQuery.mvcAjax = function(settings) {
  settings = settings || {};

  /* clear errors an responds */
  mvc.ajax.responds = undefined;
  mvc.ajax.jqxhr = undefined;
  mvc.ajax.textstatus = undefined;
  mvc.ajax.errorthrown = undefined;

  /* setup a few defaults in here not in the config this can be overridden via settings */
  mvc.ajax.options.success = function(responds) {
    mvc.ajax.responds = responds;
  };

  mvc.ajax.options.error = function(jqXHR, textStatus, errorThrown) {
    mvc.ajax.jqxhr = jqXHR;
    mvc.ajax.textstatus = textStatus;
    mvc.ajax.errorthrown = errorThrown;
  };

  /* merge it all together */
  var ready = jQuery.extend({},mvc.ajax.options,settings);

  /* make request */
  jQuery.ajax(ready);

  /* return responds */
  return mvc.ajax.responds;
};

jQuery.mvcLoad = function(file) {
  /* did we already load this js file? */
  if (mvc.loaded[file]) {
    return;
  }
  jQuery.mvcAjax({url: file + mvc.config.ext, dataType: 'script', cache: true });
  mvc.loaded[file] = true;
};

jQuery.mvcModel = function(file) {
  jQuery.mvcLoad(mvc.folders.model + file);
  var x = mvc[file];
  return jQuery.extend(true,new x(), new mvcModel());
};

/*
this will make a copy of a object without the methods
which jack up some ajax calls and other stuff
*/
jQuery.mvcClone = function(obj) {
  var clone = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof(obj[prop]) === 'object') {
        clone[prop] = mvc.clone(obj[prop]);
      } else {
        clone[prop] = obj[prop];
      }
    }
  }
  return clone;
};

/* generate uuid and return it - RFC4122 v4 UUID */
jQuery.mvcUUID = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
};

/* Auto Start JMVC? */
jQuery().ready(function(){
  if (mvc.config.autoload) {
    jQuery.mvc();
  }
});