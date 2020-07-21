(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mywebar-frontend-base"] = factory();
	else
		root["mywebar-frontend-base"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "2b27":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vue Cookies v1.7.2
 * https://github.com/cmp-cc/vue-cookies
 *
 * Copyright 2016, cmp-cc
 * Released under the MIT license
 */

(function() {

    var defaultConfig = {
        expires : '1d',
        path : '; path=/',
        domain:'',
        secure:'',
        sameSite:''
    }

    var VueCookies = {
        // install of Vue
        install: function(Vue) {
            Vue.prototype.$cookies = this
            Vue.$cookies = this
        },
        config : function(expireTimes,path,domain,secure,sameSite) {
            defaultConfig.expires = expireTimes ? expireTimes : '1d';
            defaultConfig.path = path ? '; path=' + path : '; path=/';
            defaultConfig.domain = domain ? '; domain=' + domain : '';
            defaultConfig.secure = secure ? '; Secure' : '';
            defaultConfig.sameSite = sameSite ? '; SameSite=' + sameSite : '';
        },
        get: function(key) {
            var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null

            if(value && value.substring(0,1) === "{" && value.substring(value.length-1,value.length) === "}") {
                try {
                    value = JSON.parse(value)
                }catch (e) {
                    return value;
                }
            }
            return value;
        },
        set: function(key, value, expireTimes, path, domain, secure, sameSite) {
            if (!key) {
                throw new Error("Cookie name is not find in first argument.")
            }else if(/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(key)){
                throw new Error("Cookie key name illegality, Cannot be set to ['expires','max-age','path','domain','secure','SameSite']\t current key name: " + key);
            }
            // support json object
            if(value && value.constructor === Object) {
                value = JSON.stringify(value);
            }
            var _expires = "";
            expireTimes = expireTimes === undefined ? defaultConfig.expires : expireTimes;
            if (expireTimes && expireTimes != 0) {
                switch (expireTimes.constructor) {
                    case Number:
                        if(expireTimes === Infinity || expireTimes === -1) _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                        else _expires = "; max-age=" + expireTimes;
                        break;
                    case String:
                        if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
                            // get capture number group
                            var _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
                            // get capture type group , to lower case
                            switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                                // Frequency sorting
                                case 'm':  _expires = "; max-age=" + +_expireTime * 2592000; break; // 60 * 60 * 24 * 30
                                case 'd':  _expires = "; max-age=" + +_expireTime * 86400; break; // 60 * 60 * 24
                                case 'h': _expires = "; max-age=" + +_expireTime * 3600; break; // 60 * 60
                                case 'min':  _expires = "; max-age=" + +_expireTime * 60; break; // 60
                                case 's': _expires = "; max-age=" + _expireTime; break;
                                case 'y': _expires = "; max-age=" + +_expireTime * 31104000; break; // 60 * 60 * 24 * 30 * 12
                                default: new Error("unknown exception of 'set operation'");
                            }
                        } else {
                            _expires = "; expires=" + expireTimes;
                        }
                        break;
                    case Date:
                        _expires = "; expires=" + expireTimes.toUTCString();
                        break;
                }
            }
            document.cookie =
                encodeURIComponent(key) + "=" + encodeURIComponent(value) +
                _expires +
                (domain ? "; domain=" + domain : defaultConfig.domain) +
                (path ? "; path=" + path : defaultConfig.path) +
                (secure === undefined ? defaultConfig.secure : secure ? "; Secure" : "") +
                (sameSite === undefined ? defaultConfig.sameSite : (sameSite ? "; SameSite=" + sameSite : ""));
            return this;
        },
        remove: function(key, path, domain) {
            if (!key || !this.isKey(key)) {
                return false;
            }
            document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : defaultConfig.domain) + (path ? "; path=" + path : defaultConfig.path);
            return this;
        },
        isKey: function(key) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys:  function() {
            if(!document.cookie) return [];
            var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var _index = 0; _index < _keys.length; _index++) {
                _keys[_index] = decodeURIComponent(_keys[_index]);
            }
            return _keys;
        }
    }

    if (true) {
        module.exports = VueCookies;
    } else {}
    // vue-cookies can exist independently,no dependencies library
    if(typeof window!=="undefined"){
        window.$cookies = VueCookies;
    }

})()


/***/ }),

/***/ "6860":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8baf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6860");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b37f21e4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Header.vue?vue&type=template&id=f0624514&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[{ fix_position: _vm.flag_fixed }, 'header']},[_c('div',{staticClass:"wrapper-content m-2"},[_c('router-link',{attrs:{"to":_vm.url.logo}},[_c('img',{staticClass:"img-width-logo",attrs:{"src":"/img/Header-logo.png","alt":"Logo"}})]),_c('div',{staticStyle:{"display":"flex","align-items":"center","justify-content":"center"}},[(_vm.flag_support)?_c('div',[_c('h4',{staticClass:"support"},[_vm._v("Support")])]):_vm._e(),(_vm.flag_menu)?_c('b-dropdown',{attrs:{"id":"dropdown-header","toggle-class":"text-decoration-none bg-transparent border-0 m-0 p-0","menu-class":"border-0","button-class":"p-0","size":"lg","offset":"0,10","right":"","block":""},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('img',{staticClass:"img-width-logo-user",attrs:{"src":"/img/Logo-user.png","alt":"Logo"}})]},proxy:true}],null,false,3764686658)},[_c('div',{staticClass:"block-user-data"},[_c('span',{staticClass:"user-name"},[_vm._v(_vm._s(_vm.name))]),_c('span',{staticClass:"user-email"},[_vm._v(_vm._s(_vm.email))])]),_c('b-dropdown-divider'),_c('b-dropdown-item',{attrs:{"to":_vm.url.dashboard}},[_vm._v("Dashboard")]),_c('b-dropdown-item',{attrs:{"to":_vm.url.account}},[_vm._v("Account")]),_c('b-dropdown-item',{on:{"click":_vm.showHideHelpPopup}},[_vm._v("Support")]),_c('b-dropdown-item',{on:{"click":_vm.planPopupShow}},[_vm._v("Plans")]),_c('b-dropdown-item',{on:{"click":_vm.logOut}},[_vm._v("Log Out")])],1):_vm._e()],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Header.vue?vue&type=template&id=f0624514&

// EXTERNAL MODULE: ./node_modules/vue-cookies/vue-cookies.js
var vue_cookies = __webpack_require__("2b27");
var vue_cookies_default = /*#__PURE__*/__webpack_require__.n(vue_cookies);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Header.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import axios from "../Scripts/service/axios.js";
// import PopupHelp from './Popup/Help.vue'
// import PopupTarif from './Popup/Popup-tariff.vue'
// import Background from './Background.vue'
// import Loader from './Loader.vue'

/* harmony default export */ var Headervue_type_script_lang_js_ = ({
  name: "header-page",
  props: ["flag_fixed", "flag_loader", "flag_menu", "url", "flag_support", "flag_background", "parent_component"],
  components: {// PopupHelp,
    // PopupTarif,
    // Background,
    // Loader
  },
  data: function data() {
    var data = {
      name: "John Marston",
      email: "john@mail.com",
      flag_help_popup: false,
      isplanPopup: false
    };
    return data;
  },
  mounted: function mounted() {
    if (!vue_cookies_default.a.get("AuthToken")) {
      this.$router.push("/");
    } // axios
    //   .get("user/details")
    //   .then((res) => {
    //     this.email = res.data.success.email;
    //     this.name = res.data.success.name;
    //     this.parent_component.user_name = res.data.success.name;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     this.$router.push("/");
    //   });

  },
  methods: {
    planPopupShow: function planPopupShow() {
      this.isplanPopup = !this.isplanPopup;
    },
    showHideHelpPopup: function showHideHelpPopup() {
      this.flag_help_popup = !this.flag_help_popup;
      document.getElementsByTagName("body")[0].style.overflow = this.flag_help_popup ? "hidden" : "";
    },
    logOut: function logOut() {
      vue_cookies_default.a.remove("AuthToken");
      this.$router.push("/");
    }
  }
});
// CONCATENATED MODULE: ./src/components/Header.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Headervue_type_script_lang_js_ = (Headervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Header.vue?vue&type=style&index=0&lang=css&
var Headervue_type_style_index_0_lang_css_ = __webpack_require__("8baf");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/Header.vue






/* normalize component */

var component = normalizeComponent(
  components_Headervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Header = (component.exports);
// CONCATENATED MODULE: ./src/main.js

/* harmony default export */ var main = (Header);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main);



/***/ })

/******/ });
});
//# sourceMappingURL=mywebar-frontend-base.umd.js.map