// Adapted from Rollup
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
      ? factory(exports)
      : typeof define === 'function' && define.amd
          ? define(['exports'], factory)
          : (factory((global.loadJsCss = {})));
}(this, (function (exports) {
  'use strict';

  // This library assumes it is loaded in a browser, hence `document` is defined.
  var head = document.head || document.getElementsByTagName('head')[0];

  function loadList(resources, options) {
    options = options || {};

    var i = 0,
        delayScripts = options.delayScripts || false,
        scripts = [],
        resource;

    for (; i < resources.length; i += 1) {
      resource = resources[i];

      switch (resource.type && resource.type.toLowerCase()) {
        case 'js':
        case 'javascript':
        case 'script':
          if (delayScripts === false) {
            loadJs(resource);
          } else {
            scripts.push(resource);
          }
          break;
        case 'css':
        case 'stylesheet':
          loadCss(resource);
          break;
        default:
          console.error('Could not determine type of resource: ' + JSON.stringify(resource));
      }
    }

    if (scripts.length) {
      setTimeout(function () {
        options.delayScripts = false;
        loadList(scripts, options);
      }, delayScripts);
    }
  }

  // Adapted from load-script
  // https://github.com/eldargab/load-script
  // MIT License
  function loadJs(options) {
    var script = document.createElement('script'),
        src = options.src || options.path || options.href,
        cb = options.callback;

    // Use async=false by default to emulate defer and get a more predictable behaviour (i.e. scripts executed in order).
    script.async = !!options.async || false;
    script.src = src;

    // options.attrs can be used for SRI for example (integrity, crossorigin).
    if (options.attrs) {
      _setAttributes(script, options.attrs)
    }

    if (typeof cb === 'function') {
      var onEnd = 'onload' in script ? _stdOnEnd : _ieOnEnd;

      onEnd(script, cb);

      // some good legacy browsers (firefox) fail the 'in' detection above
      // so as a fallback we always set onload
      // old IE will ignore this and new IE will set onload
      if (!script.onload) {
        _stdOnEnd(script, cb);
      }
    }

    head.appendChild(script);
  }

  function loadCss(options) {
    var link = document.createElement('link'),
        href = options.href || options.path || options.src,
        cb = options.callback;

    link.rel = 'stylesheet';
    link.href = href;

    // options.attrs can be used for SRI for example (integrity, crossorigin).
    if (options.attrs) {
      _setAttributes(link, options.attrs)
    }

    head.appendChild(link);

    // Workaround the absence of error event on <link> resources.
    if (typeof cb === 'function') {
      var img = document.createElement('img');

      img.onerror = function (e) {
        cb(e, link);
      };
      img.onload = function () {
        cb(null, link);
      };
      img.src = href;
    }
  }

  function _setAttributes(element, attributes) {
    for (var attributeName in attributes) {
      element.setAttribute(attributeName, attributes[attributeName]);
    }
  }


  // Adapted from load-script
  function _stdOnEnd (script, cb) {
    script.onload = function () {
      this.onerror = this.onload = null;
      cb(null, script)
    };
    script.onerror = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null;
      cb(new Error('Failed to load ' + this.src), script)
    }
  }

  // Adapted from load-script
  function _ieOnEnd (script, cb) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') {
        return;
      }
      this.onreadystatechange = null;
      cb(null, script) // there is no way to catch loading errors in IE8
    }
  }


  // Exports
  exports.js = loadJs;
  exports.css = loadCss;
  exports.list = loadList;
})));
