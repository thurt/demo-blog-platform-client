/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(6);
var defined = __webpack_require__(7);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(43);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ViewModel = __webpack_require__(10);
const Post_1 = __webpack_require__(13);
const Toolbar_1 = __webpack_require__(56);
const Detail_1 = __webpack_require__(57);
const List_1 = __webpack_require__(58);
const MyViewModel = ViewModel(true);
let toolbar_name = 'toolbar_';
let detail_name = 'detail_';
Post_1.default(MyViewModel)
    .then(model_name => {
    Toolbar_1.default(toolbar_name, model_name, MyViewModel);
    Detail_1.default(detail_name, model_name, MyViewModel);
    List_1.default(toolbar_name, detail_name, model_name, MyViewModel);
})
    .catch(e => console.error(e));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const EventRouter = __webpack_require__(11)

module.exports = function ViewModel(shouldLogEvents) {
  const R = EventRouter(shouldLogEvents) // router
  const M = {} // models

  // closure over model key
  const modelInstance = (_key) => {
    return {
      // The name of this model
      name: _key,
      // Emit an event on this model
      emit(name, data) {
        R.emit(_key, name, data)
      }
    }
  }

  return Object.freeze({
    // Create a new model
    create(key, extend_members) {
      let model = M[key]
      if (model !== undefined) return false

      model = M[key] = Object.create(null)
      model.instance = modelInstance(key)
      model.listeners = new WeakMap() // for mapping listener to it's model-bound copy
      Object.freeze(Object.assign(model.instance, extend_members))

      return true
    },
    // Run a function inside of a model
    run(key, funcToRun, ...args) {
      const model = M[key]
      if (model === undefined) return false

      funcToRun.apply(model.instance, args)
      return true
    },
    // Check if a model exists
    exists(key) {
      if (M[key] === undefined) return false
      return true
    },
    // Delete an existing model and all event listeners of that model
    destroy(key) {
      if (M[key] === undefined) return false

      R.purge(key)
      delete M[key]

      return true
    },
    // Add event listeners to this model
    add(key, methods) {
      const results = {}
      const model = M[key]
      if (model === undefined) return false

      for (let name in methods) {
        let method = methods[name]
        let boundMethod
        if (typeof method !== 'function') {
          results[name] = false
          continue
        }
        if (model.listeners.has(method)) {
          boundMethod = model.listeners.get(method)
        } else {
          boundMethod = method.bind(model.instance)
          model.listeners.set(method, boundMethod)
        }
        results[name] = R.add(key, name, boundMethod)
      }

      return results
    },
      // Remove event listeners from this model
    remove(key, methods) {
        const results = {}
        const model = M[key]
        if (model === undefined) return false

        for (let name in methods) {
          let method = methods[name]

          if (typeof method !== 'function') {
            results[name] = false
            continue
          }
          if (model.listeners.has(method)) {
            results[name] = R.remove(key, name, model.listeners.get(method))
          }
        }

        return results
      },
    getModelNames() {
      return Object.keys(M)
    }
  })
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const copyObjectGraph = __webpack_require__(12)
const myName = 'EventRouter'

function EventRouter(shouldLogCalls) {
  const events = Object.create(null)

  var public_interface = {
    getEvents() {
      return copyObjectGraph(events)
    },

    add(type, key, callback) {
      return _add(type, key, callback, events)
    },

    remove(type, key, callback) {
      return _remove(type, key, callback, events)
    },

    emit(type, key, data) {
      return _emit(type, key, data, events)
    },

    purge(type) {
      return _purge(type, events)
    }
  }

  if (shouldLogCalls) { // add logging proxy
    for (let method_name in public_interface) {
      public_interface[method_name] = closure(method_name, public_interface[method_name])
    }
    console.info(myName, 'is logging calls')
  }
  function closure(method_name, method) {
    return function(...args) {
      console.info(myName, method_name, args[0], args[1])
      return method.apply(null, args)
    }
  }

  return Object.freeze(public_interface)
}

module.exports = EventRouter
/////////////////////////////////////////////////////
/*
  t = type
  k = key
  d = data
  o = object
  cb = callback
*/
function _purge(t, o) {
  delete o[t]
}
function _emit(t, k, d, o) {
  var ot = o[t]
  if (ot === undefined) {
    console.warn(myName, 'event type', t, k, 'was just fired but there are no registered callbacks')
    return false
  }
  var otk = ot[k]
  if (otk === undefined) {
    console.warn(myName, 'event type', t, k, 'was just fired but there are no registered callbacks')
    return false
  }

  for (let cb of otk) cb(d)

  return true
}
function _add(t, k, cb, o) {
  var ot = o[t]
  if (ot === undefined) ot = o[t] = {}

  var otk = ot[k]
  if (otk === undefined) otk = ot[k] = []

  if (otk.includes(cb)) {
    console.warn(myName, 'event type', t, k, 'already has this callback function')
    return false
  }
  else otk.push(cb)

  return true
}
function _remove(t, k, cb, o) {
  var ot = o[t]
  if (ot === undefined) {
    console.warn(myName, 'cannot find type', t)
    return false
  }
  var otk = ot[k]
  if (otk === undefined) {
    console.warn(myName, 'cannot find key', k, 'in type', t)
    return false
  }
  if (!otk.includes(cb)) {
    console.warn(myName, 'cannot find this callback function under key', k, 'in type', t)
    return false
  }

  otk.splice(otk.indexOf(cb), 1)

  if (!otk.length) {
    delete ot[k]
    if (!Object.keys(ot).length) delete o[t]
  }

  return true
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
 Copy Object Graphs
  Source: https://github.com/thurt/copy-object-graph
  Supports: nested/self-referencing objects, nested/self-referencing arrays, numbers, strings, null undefined
*/
function copyObjectGraph(obj) {
  if (typeof WeakMap !== 'function') throw new ReferenceError('copyObjectGraph requires WeakMap')

  var _pool = new WeakMap()
  return cpObj(obj)

  function cpObj(obj) {
    var cp
    if (typeof obj !== 'object') return obj
    if (obj === null) return null
    if (_pool.has(obj)) return _pool.get(obj) // for self-references

    if (Array.isArray(obj)) cp = obj.slice()
    else cp = Object.assign({}, obj)

    _pool.set(obj, cp)
    return cpProps(cp)
  }
  function cpProps(cp) {
    for (var prop in cp) cp[prop] = cpObj(cp[prop])
    return cp
  }
}

module.exports = copyObjectGraph

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store = __webpack_require__(14);
const api_1 = __webpack_require__(15);
const STORE = Store('localStorage');
function convert(prop) {
    switch (prop) {
        case 'modified':
            return 'last_edited';
        case 'body':
            return 'content';
        default:
            return prop;
    }
}
function Note(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const myName = 'Post';
        const POSTS = {};
        app.create(myName, {
            new() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const pid = yield api_1.posts.createPost({ body: {} });
                        this.emit('new', pid);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            },
            get(key, prop) {
                const nk = POSTS[key];
                if (nk === undefined)
                    return console.warn(this.name, 'key', key, 'does not exist');
                const cp = convert(prop);
                //@ts-ignore
                const nkp = nk[cp];
                if (nkp === undefined)
                    return console.warn(this.name, 'property', prop, 'for key', key, 'does not exist');
                if (typeof nkp === 'object' && nkp !== null)
                    return console.warn(this.name, 'property', prop, 'for key', key, 'is an object. Only primitives can be accessed.');
                return nkp;
            },
            getKeys() {
                return Object.keys(POSTS);
            },
            update(id, obj) {
                return __awaiter(this, void 0, void 0, function* () {
                    let changed = false;
                    const p = POSTS[id];
                    if (p === undefined)
                        return console.warn(this.name, 'id', id, 'does not exist');
                    for (let prop in obj) {
                        const cp = convert(prop);
                        //@ts-ignore
                        let pp = p[cp];
                        if (pp === undefined) {
                            console.warn(this.name, 'property', prop, 'for id', id, 'does not exist');
                            continue;
                        }
                        if (pp !== obj[prop]) {
                            //@ts-ignore
                            p[cp] = obj[prop];
                            this.emit('update_' + prop, id);
                            changed = true;
                        }
                    }
                    if (changed) {
                        try {
                            yield api_1.posts.updatePost({ id, body: p });
                            const pu = yield api_1.posts.getPost({ id });
                            POSTS[id].last_edited = pu.last_edited;
                            this.emit('update_modified', id);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                });
            },
            delete(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const pid = yield api_1.posts.deletePost({ id });
                        delete POSTS[id];
                        this.emit('delete', id);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            },
        });
        try {
            let s;
            const v = STORE.get('state');
            if (v !== false) {
                s = JSON.parse(v);
            }
            else {
                throw "STORE.get('state') must exist";
            }
            const access_token = s.authUser && s.authUser.access_token;
            if (!access_token) {
                throw 'state.authUser.access_token must exist';
            }
            yield api_1.streamRequest(api_1.basePath + '/posts', (pc) => {
                const p = pc.result;
                POSTS[p.id] = p;
            }, {
                headers: new Headers({
                    Authorization: `Bearer ${access_token}`,
                }),
            });
        }
        catch (e) {
            console.error(e);
        }
        return myName;
    });
}
exports.default = Note;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function StorageManager(type) {
  if (type !== 'localStorage' && type !== 'sessionStorage') throw new ReferenceError(`StorageManager does not support storage type ${type}`)

  const myStore = window[type]

  return {
    get(key) {
      var item = myStore.getItem(key)
      if (item !== null) return item
      return false
    },
    getAll() {
      var key = ''
      var map = {}
      var item = null
      for (var i = 0; i < myStore.length; i++) {
        key = myStore.key(i)
        if (~key.indexOf('_')) continue
        item = myStore.getItem(key)
        map[key] = item
      }
      return map
    },
    set(key, obj) {
      try {
        var data
        if (typeof obj !== 'string') data = JSON.stringify(obj)
        else data = obj

        myStore.setItem(key, data)
        return true
      }
      catch(e) {
        console.error(e)
        return false
      }
    },
    remove(key) {
      var item = myStore.getItem(key)
      if (item === null) return false
      myStore.removeItem(key)
      return true
    },
    length() {
      return myStore.length
    },
    clear() {
      myStore.clear()
    }
  }
}

module.exports = StorageManager

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __webpack_require__(16);
const ndjsonStream = __webpack_require__(54); // This file should be imported using the CommonJS-style
exports.basePath = '/api';
exports.posts = new api.PostsApi();
exports.auth = new api.AuthApi();
function streamRequest(path, cb, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const r = yield fetch(path, options);
        if (!r.ok) {
            throw r;
        }
        const reader = ndjsonStream(r.body).getReader();
        let c;
        while (true) {
            c = yield reader.read();
            if (c.done) {
                break;
            }
            cb(c.value);
        }
    });
}
exports.streamRequest = streamRequest;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * CMS
 * CMS Service API provides access to CMS entities and supports CMS use-cases
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var url = __webpack_require__(17);
var isomorphicFetch = __webpack_require__(25);
var assign = __webpack_require__(27);
var BASE_PATH = 'https://learned-stone-189802.appspot.com/api'.replace(/\/+$/, '');
var BaseAPI = /** @class */ (function () {
    function BaseAPI(fetch, basePath) {
        if (fetch === void 0) { fetch = isomorphicFetch; }
        if (basePath === void 0) { basePath = BASE_PATH; }
        this.basePath = basePath;
        this.fetch = fetch;
    }
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;
/**
 * AuthApi - fetch parameter creator
 */
exports.AuthApiFetchParamCreator = {
    /**
     *
     * @summary Authorize as a user to get an access token
     * @param body
     */
    authUser: function (params, options) {
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling authUser');
        }
        var baseUrl = "/auth/user";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'POST' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * AuthApi - functional programming interface
 */
exports.AuthApiFp = {
    /**
     *
     * @summary Authorize as a user to get an access token
     * @param body
     */
    authUser: function (params, options) {
        var fetchArgs = exports.AuthApiFetchParamCreator.authUser(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * AuthApi - object-oriented interface
 */
var AuthApi = /** @class */ (function (_super) {
    __extends(AuthApi, _super);
    function AuthApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @summary Authorize as a user to get an access token
     * @param body
     */
    AuthApi.prototype.authUser = function (params, options) {
        return exports.AuthApiFp.authUser(params, options)(this.fetch, this.basePath);
    };
    return AuthApi;
}(BaseAPI));
exports.AuthApi = AuthApi;
/**
 * AuthApi - factory interface
 */
exports.AuthApiFactory = function (fetch, basePath) {
    return {
        /**
         *
         * @summary Authorize as a user to get an access token
         * @param body
         */
        authUser: function (params, options) {
            return exports.AuthApiFp.authUser(params, options)(fetch, basePath);
        },
    };
};
/**
 * CommentsApi - fetch parameter creator
 */
exports.CommentsApiFetchParamCreator = {
    /**
     *
     * @summary Create a comment
     * @param body
     */
    createComment: function (params, options) {
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling createComment');
        }
        var baseUrl = "/comments";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'POST' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Delete a comment
     * @param id
     */
    deleteComment: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling deleteComment');
        }
        var baseUrl = "/comments/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'DELETE' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get a comment
     * @param id
     */
    getComment: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling getComment');
        }
        var baseUrl = "/comments/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get all comments
     */
    getComments: function (options) {
        var baseUrl = "/comments";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Update a comment
     * @param id
     * @param body
     */
    updateComment: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling updateComment');
        }
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling updateComment');
        }
        var baseUrl = "/comments/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'PUT' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * CommentsApi - functional programming interface
 */
exports.CommentsApiFp = {
    /**
     *
     * @summary Create a comment
     * @param body
     */
    createComment: function (params, options) {
        var fetchArgs = exports.CommentsApiFetchParamCreator.createComment(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Delete a comment
     * @param id
     */
    deleteComment: function (params, options) {
        var fetchArgs = exports.CommentsApiFetchParamCreator.deleteComment(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get a comment
     * @param id
     */
    getComment: function (params, options) {
        var fetchArgs = exports.CommentsApiFetchParamCreator.getComment(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get all comments
     */
    getComments: function (options) {
        var fetchArgs = exports.CommentsApiFetchParamCreator.getComments(options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Update a comment
     * @param id
     * @param body
     */
    updateComment: function (params, options) {
        var fetchArgs = exports.CommentsApiFetchParamCreator.updateComment(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * CommentsApi - object-oriented interface
 */
var CommentsApi = /** @class */ (function (_super) {
    __extends(CommentsApi, _super);
    function CommentsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @summary Create a comment
     * @param body
     */
    CommentsApi.prototype.createComment = function (params, options) {
        return exports.CommentsApiFp.createComment(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Delete a comment
     * @param id
     */
    CommentsApi.prototype.deleteComment = function (params, options) {
        return exports.CommentsApiFp.deleteComment(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get a comment
     * @param id
     */
    CommentsApi.prototype.getComment = function (params, options) {
        return exports.CommentsApiFp.getComment(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get all comments
     */
    CommentsApi.prototype.getComments = function (options) {
        return exports.CommentsApiFp.getComments(options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Update a comment
     * @param id
     * @param body
     */
    CommentsApi.prototype.updateComment = function (params, options) {
        return exports.CommentsApiFp.updateComment(params, options)(this.fetch, this.basePath);
    };
    return CommentsApi;
}(BaseAPI));
exports.CommentsApi = CommentsApi;
/**
 * CommentsApi - factory interface
 */
exports.CommentsApiFactory = function (fetch, basePath) {
    return {
        /**
         *
         * @summary Create a comment
         * @param body
         */
        createComment: function (params, options) {
            return exports.CommentsApiFp.createComment(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Delete a comment
         * @param id
         */
        deleteComment: function (params, options) {
            return exports.CommentsApiFp.deleteComment(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get a comment
         * @param id
         */
        getComment: function (params, options) {
            return exports.CommentsApiFp.getComment(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get all comments
         */
        getComments: function (options) {
            return exports.CommentsApiFp.getComments(options)(fetch, basePath);
        },
        /**
         *
         * @summary Update a comment
         * @param id
         * @param body
         */
        updateComment: function (params, options) {
            return exports.CommentsApiFp.updateComment(params, options)(fetch, basePath);
        },
    };
};
/**
 * PostsApi - fetch parameter creator
 */
exports.PostsApiFetchParamCreator = {
    /**
     *
     * @summary Create a post
     * @param body
     */
    createPost: function (params, options) {
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling createPost');
        }
        var baseUrl = "/posts";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'POST' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Delete a post
     * @param id
     */
    deletePost: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling deletePost');
        }
        var baseUrl = "/posts/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'DELETE' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get a post
     * @param id
     */
    getPost: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling getPost');
        }
        var baseUrl = "/posts/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get a post (by slug)
     * @param slug
     */
    getPostBySlug: function (params, options) {
        // verify required parameter "slug" is set
        if (params['slug'] == null) {
            throw new Error('Missing required parameter slug when calling getPostBySlug');
        }
        var baseUrl = "/posts/slug/{slug}".replace("{" + 'slug' + "}", "" + params['slug']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get all comments by post
     * @param id
     */
    getPostComments: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling getPostComments');
        }
        var baseUrl = "/posts/{id}/comments".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get all posts
     * @param includeUnPublished when true, includes unpublished Posts in response (note: Authorization token with ADMIN role is required).
     */
    getPosts: function (params, options) {
        var baseUrl = "/posts";
        var urlObj = url.parse(baseUrl, true);
        urlObj.query = assign({}, urlObj.query, {
            includeUnPublished: params['includeUnPublished'],
        });
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Update a post
     * @param id
     * @param body
     */
    updatePost: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling updatePost');
        }
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling updatePost');
        }
        var baseUrl = "/posts/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'PUT' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * PostsApi - functional programming interface
 */
exports.PostsApiFp = {
    /**
     *
     * @summary Create a post
     * @param body
     */
    createPost: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.createPost(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Delete a post
     * @param id
     */
    deletePost: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.deletePost(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get a post
     * @param id
     */
    getPost: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.getPost(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get a post (by slug)
     * @param slug
     */
    getPostBySlug: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.getPostBySlug(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get all comments by post
     * @param id
     */
    getPostComments: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.getPostComments(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get all posts
     * @param includeUnPublished when true, includes unpublished Posts in response (note: Authorization token with ADMIN role is required).
     */
    getPosts: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.getPosts(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Update a post
     * @param id
     * @param body
     */
    updatePost: function (params, options) {
        var fetchArgs = exports.PostsApiFetchParamCreator.updatePost(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * PostsApi - object-oriented interface
 */
var PostsApi = /** @class */ (function (_super) {
    __extends(PostsApi, _super);
    function PostsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @summary Create a post
     * @param body
     */
    PostsApi.prototype.createPost = function (params, options) {
        return exports.PostsApiFp.createPost(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Delete a post
     * @param id
     */
    PostsApi.prototype.deletePost = function (params, options) {
        return exports.PostsApiFp.deletePost(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get a post
     * @param id
     */
    PostsApi.prototype.getPost = function (params, options) {
        return exports.PostsApiFp.getPost(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get a post (by slug)
     * @param slug
     */
    PostsApi.prototype.getPostBySlug = function (params, options) {
        return exports.PostsApiFp.getPostBySlug(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get all comments by post
     * @param id
     */
    PostsApi.prototype.getPostComments = function (params, options) {
        return exports.PostsApiFp.getPostComments(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get all posts
     * @param includeUnPublished when true, includes unpublished Posts in response (note: Authorization token with ADMIN role is required).
     */
    PostsApi.prototype.getPosts = function (params, options) {
        return exports.PostsApiFp.getPosts(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Update a post
     * @param id
     * @param body
     */
    PostsApi.prototype.updatePost = function (params, options) {
        return exports.PostsApiFp.updatePost(params, options)(this.fetch, this.basePath);
    };
    return PostsApi;
}(BaseAPI));
exports.PostsApi = PostsApi;
/**
 * PostsApi - factory interface
 */
exports.PostsApiFactory = function (fetch, basePath) {
    return {
        /**
         *
         * @summary Create a post
         * @param body
         */
        createPost: function (params, options) {
            return exports.PostsApiFp.createPost(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Delete a post
         * @param id
         */
        deletePost: function (params, options) {
            return exports.PostsApiFp.deletePost(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get a post
         * @param id
         */
        getPost: function (params, options) {
            return exports.PostsApiFp.getPost(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get a post (by slug)
         * @param slug
         */
        getPostBySlug: function (params, options) {
            return exports.PostsApiFp.getPostBySlug(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get all comments by post
         * @param id
         */
        getPostComments: function (params, options) {
            return exports.PostsApiFp.getPostComments(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get all posts
         * @param includeUnPublished when true, includes unpublished Posts in response (note: Authorization token with ADMIN role is required).
         */
        getPosts: function (params, options) {
            return exports.PostsApiFp.getPosts(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Update a post
         * @param id
         * @param body
         */
        updatePost: function (params, options) {
            return exports.PostsApiFp.updatePost(params, options)(fetch, basePath);
        },
    };
};
/**
 * SetupApi - fetch parameter creator
 */
exports.SetupApiFetchParamCreator = {
    /**
     *
     * @summary Check if application is setup
     */
    isSetup: function (options) {
        var baseUrl = "/is-setup";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Setup the application
     * @param body
     */
    setup: function (params, options) {
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling setup');
        }
        var baseUrl = "/setup";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'POST' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * SetupApi - functional programming interface
 */
exports.SetupApiFp = {
    /**
     *
     * @summary Check if application is setup
     */
    isSetup: function (options) {
        var fetchArgs = exports.SetupApiFetchParamCreator.isSetup(options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Setup the application
     * @param body
     */
    setup: function (params, options) {
        var fetchArgs = exports.SetupApiFetchParamCreator.setup(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * SetupApi - object-oriented interface
 */
var SetupApi = /** @class */ (function (_super) {
    __extends(SetupApi, _super);
    function SetupApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @summary Check if application is setup
     */
    SetupApi.prototype.isSetup = function (options) {
        return exports.SetupApiFp.isSetup(options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Setup the application
     * @param body
     */
    SetupApi.prototype.setup = function (params, options) {
        return exports.SetupApiFp.setup(params, options)(this.fetch, this.basePath);
    };
    return SetupApi;
}(BaseAPI));
exports.SetupApi = SetupApi;
/**
 * SetupApi - factory interface
 */
exports.SetupApiFactory = function (fetch, basePath) {
    return {
        /**
         *
         * @summary Check if application is setup
         */
        isSetup: function (options) {
            return exports.SetupApiFp.isSetup(options)(fetch, basePath);
        },
        /**
         *
         * @summary Setup the application
         * @param body
         */
        setup: function (params, options) {
            return exports.SetupApiFp.setup(params, options)(fetch, basePath);
        },
    };
};
/**
 * UsersApi - fetch parameter creator
 */
exports.UsersApiFetchParamCreator = {
    /**
     *
     * @summary Create a user
     * @param body
     */
    createUser: function (params, options) {
        // verify required parameter "body" is set
        if (params['body'] == null) {
            throw new Error('Missing required parameter body when calling createUser');
        }
        var baseUrl = "/users";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'POST' }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { 'Content-Type': 'application/json' };
        if (params['body']) {
            fetchOptions.body = JSON.stringify(params['body'] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Delete a user
     * @param id
     */
    deleteUser: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling deleteUser');
        }
        var baseUrl = "/users/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'DELETE' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get a user
     * @param id
     */
    getUser: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling getUser');
        }
        var baseUrl = "/users/{id}".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     *
     * @summary Get all comments by user
     * @param id
     */
    getUserComments: function (params, options) {
        // verify required parameter "id" is set
        if (params['id'] == null) {
            throw new Error('Missing required parameter id when calling getUserComments');
        }
        var baseUrl = "/users/{id}/comments".replace("{" + 'id' + "}", "" + params['id']);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: 'GET' }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * UsersApi - functional programming interface
 */
exports.UsersApiFp = {
    /**
     *
     * @summary Create a user
     * @param body
     */
    createUser: function (params, options) {
        var fetchArgs = exports.UsersApiFetchParamCreator.createUser(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Delete a user
     * @param id
     */
    deleteUser: function (params, options) {
        var fetchArgs = exports.UsersApiFetchParamCreator.deleteUser(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get a user
     * @param id
     */
    getUser: function (params, options) {
        var fetchArgs = exports.UsersApiFetchParamCreator.getUser(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     *
     * @summary Get all comments by user
     * @param id
     */
    getUserComments: function (params, options) {
        var fetchArgs = exports.UsersApiFetchParamCreator.getUserComments(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * UsersApi - object-oriented interface
 */
var UsersApi = /** @class */ (function (_super) {
    __extends(UsersApi, _super);
    function UsersApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @summary Create a user
     * @param body
     */
    UsersApi.prototype.createUser = function (params, options) {
        return exports.UsersApiFp.createUser(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Delete a user
     * @param id
     */
    UsersApi.prototype.deleteUser = function (params, options) {
        return exports.UsersApiFp.deleteUser(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get a user
     * @param id
     */
    UsersApi.prototype.getUser = function (params, options) {
        return exports.UsersApiFp.getUser(params, options)(this.fetch, this.basePath);
    };
    /**
     *
     * @summary Get all comments by user
     * @param id
     */
    UsersApi.prototype.getUserComments = function (params, options) {
        return exports.UsersApiFp.getUserComments(params, options)(this.fetch, this.basePath);
    };
    return UsersApi;
}(BaseAPI));
exports.UsersApi = UsersApi;
/**
 * UsersApi - factory interface
 */
exports.UsersApiFactory = function (fetch, basePath) {
    return {
        /**
         *
         * @summary Create a user
         * @param body
         */
        createUser: function (params, options) {
            return exports.UsersApiFp.createUser(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Delete a user
         * @param id
         */
        deleteUser: function (params, options) {
            return exports.UsersApiFp.deleteUser(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get a user
         * @param id
         */
        getUser: function (params, options) {
            return exports.UsersApiFp.getUser(params, options)(fetch, basePath);
        },
        /**
         *
         * @summary Get all comments by user
         * @param id
         */
        getUserComments: function (params, options) {
            return exports.UsersApiFp.getUserComments(params, options)(fetch, basePath);
        },
    };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(18);
var util = __webpack_require__(21);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(22);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module), __webpack_require__(20)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(23);
exports.encode = exports.stringify = __webpack_require__(24);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(26);
module.exports = self.fetch.bind(self);


/***/ }),
/* 26 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(29);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(39) });


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var ctx = __webpack_require__(30);
var hide = __webpack_require__(32);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(31);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(33);
var createDesc = __webpack_require__(38);
module.exports = __webpack_require__(2) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(34);
var IE8_DOM_DEFINE = __webpack_require__(35);
var toPrimitive = __webpack_require__(37);
var dP = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(36)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(52);
var toObject = __webpack_require__(53);
var IObject = __webpack_require__(6);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(41);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(42);
var toIObject = __webpack_require__(5);
var arrayIndexOf = __webpack_require__(44)(false);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(45);
var toAbsoluteIndex = __webpack_require__(46);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(8);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(8);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(48)('keys');
var uid = __webpack_require__(49);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(7);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/*exported ndjsonStream*/

var namespace = __webpack_require__(55);

var ndjsonStream = function(response) {
  // For cancellation
  var is_reader, cancellationRequest = false;
  return new ReadableStream({
    start: function(controller) {
      var reader = response.getReader();
      is_reader = reader;
      var decoder = new TextDecoder();
      var data_buf = "";

      reader.read().then(function processResult(result) {
        if (result.done) {
          if (cancellationRequest) {
            // Immediately exit
            return;
          }

          data_buf = data_buf.trim();
          if (data_buf.length !== 0) {
            try {
              var data_l = JSON.parse(data_buf);
              controller.enqueue(data_l);
            } catch(e) {
              controller.error(e);
              return;
            }
          }
          controller.close();
          return;
        }

        var data = decoder.decode(result.value, {stream: true});
        data_buf += data;
        var lines = data_buf.split("\n");
        for(var i = 0; i < lines.length - 1; ++i) {
          var l = lines[i].trim();
          if (l.length > 0) {
            try {
              var data_line = JSON.parse(l);
              controller.enqueue(data_line);
            } catch(e) {
              controller.error(e);
              cancellationRequest = true;
              reader.cancel();
              return;
            }
          }
        }
        data_buf = lines[lines.length-1];

        return reader.read().then(processResult);
      });

    },
    cancel: function(reason) {
      console.log("Cancel registered due to ", reason);
      cancellationRequest = true;
      is_reader.cancel();
    }
  });
};

module.exports = namespace.ndjsonStream = ndjsonStream;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Toolbar(myName, myModel, app) {
    const myView = document.getElementById('Toolbar');
    const myData = Object.create(null);
    // fill myData
    for (let i = 0, els = myView.querySelectorAll('[data-name]'); i < els.length; i++) {
        myData[els[i].dataset.name] = els[i];
    }
    function click(e) {
        e.stopPropagation();
        app.run(myModel, _click, e.target);
    }
    function _click(target) {
        const name = target.dataset.name;
        if (name !== 'delete')
            return this.emit(myName + name);
        if (window.confirm(`Are you sure you want to delete this ${myModel} ?`)) {
            this.emit(myName + name);
        }
    }
    myView.addEventListener('click', click, true);
    app.add(myModel, {
        [myName + 'disableButton'](btn_name) {
            const btn = myData[btn_name];
            if (btn !== undefined)
                btn.disabled = true;
            else
                console.warn('Cannot find button by name', btn_name);
        },
        [myName + 'enableButton'](btn_name) {
            const btn = myData[btn_name];
            if (btn !== undefined)
                btn.disabled = false;
            else
                console.warn('Cannot find button by name', btn_name);
        },
    });
}
exports.default = Toolbar;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Detail(myName, myModel, app) {
    const myView = document.getElementById('Detail');
    const myData = Object.create(null);
    const myEmpty = document.getElementById('Empty');
    // fill myData
    for (let i = 0, els = myView.querySelectorAll('[data-name]'); i < els.length; i++) {
        let e = els[i];
        myData[e.dataset.name] = e;
    }
    let myKey = null;
    function input(e) {
        e.stopPropagation();
        app.run(myModel, _input, e.target);
    }
    function _input(target) {
        switch (target.dataset.name) {
            case 'title':
                this.update(myKey, { [target.dataset.name]: target.innerText });
                break;
            case 'body':
                this.update(myKey, { [target.dataset.name]: target.innerHTML });
                break;
            default:
                console.warn(myName, ': this view-model does not recognize dataset name', target.dataset.name);
                break;
        }
    }
    myView.addEventListener('input', input, true);
    myData['title'].addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            // enter
            e.preventDefault();
        }
    });
    function clearSelections() {
        Object.keys(myData).forEach(key => myData[key].blur());
        window.getSelection().removeAllRanges();
    }
    app.add(myModel, {
        update_modified(key) {
            if (myKey !== key)
                return;
            myData['modified'].textContent =
                'Modified: ' + this.get(myKey, 'modified');
        },
        [myName + 'set'](key) {
            clearSelections();
            myKey = key;
            for (let name in myData) {
                let value = this.get(myKey, name);
                if (name === 'created' || name === 'modified') {
                    value = name.charAt(0).toUpperCase() + name.slice(1) + ': ' + value;
                }
                myData[name].innerHTML = value;
            }
            if (myView.classList.contains('hidden')) {
                myView.classList.remove('hidden');
                myEmpty.classList.add('hidden');
            }
        },
        [myName + 'clear']() {
            if (myView.classList.contains('hidden'))
                return;
            myView.classList.add('hidden');
            myEmpty.classList.remove('hidden');
            myKey = null;
            clearSelections();
        },
    });
}
exports.default = Detail;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function List(myToolbar, myDetail, myModel, app) {
    const myView = document.getElementById('List');
    const myKeys = new WeakMap();
    let open_el = null;
    let auto_open = false;
    function click(e) {
        e.stopPropagation();
        app.run(myModel, _click, e.target);
    }
    function _click(target) {
        if (!open(target))
            return;
        this.emit(myToolbar + 'enableButton', 'delete');
        this.emit(myDetail + 'set', myKeys.get(open_el));
    }
    function open(target) {
        if (open_el) {
            if (open_el === target)
                return false; // target is already open
            open_el.classList.remove('active');
        }
        open_el = target;
        open_el.classList.add('active');
        return true; // opened target
    }
    function checkForEmptyTitle(title) {
        if (title === '') {
            return '<Untitled>';
        }
        else {
            return title;
        }
    }
    myView.addEventListener('click', click, true);
    app.add(myModel, {
        new(key) {
            const title = checkForEmptyTitle(this.get(key, 'title'));
            const btn = document.createElement('button');
            btn.textContent = title;
            btn.setAttribute('title', title);
            btn.classList.add('btn');
            btn.classList.add('btn-default');
            myKeys.set(btn, key);
            myView.insertBefore(btn, myView.childNodes[0]);
            if (auto_open) {
                auto_open = false;
                _click.call(this, btn);
            }
        },
        update_title(key) {
            const title = checkForEmptyTitle(this.get(key, 'title'));
            open_el.innerText = title;
            open_el.setAttribute('title', title);
        },
        delete(key) {
            const next_sibling = open_el.nextElementSibling;
            open_el.remove();
            open_el = null;
            if (next_sibling === null) {
                this.emit(myToolbar + 'disableButton', 'delete');
                this.emit(myDetail + 'clear');
            }
            else {
                app.run(myModel, _click, next_sibling);
            }
        },
        [myToolbar + 'delete']() {
            this.delete(myKeys.get(open_el));
        },
        [myToolbar + 'new']() {
            auto_open = true;
            this.new();
        },
    });
    // Fill List with existing items
    app.run(myModel, function () {
        this.getKeys()
            .sort((a, b) => {
            // sort by created date descending
            const a_created = Date.parse(this.get(a, 'created'));
            const b_created = Date.parse(this.get(b, 'created'));
            return a_created > b_created;
        })
            .forEach((key) => this.emit('new', key));
    });
}
exports.default = List;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map