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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("restify-errors");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _restify = __webpack_require__(4);

var _restify2 = _interopRequireDefault(_restify);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeEnvFile = __webpack_require__(5);

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nodeEnvFile2.default)('dist/.env');

_mongoose2.default.Promise = global.Promise;

var server = _restify2.default.createServer({
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION
});

server.pre(_restify2.default.pre.sanitizePath());

server.use(_restify2.default.jsonBodyParser({ mapParams: true }));
server.use(_restify2.default.queryParser({ mapParams: true }));
server.use(_restify2.default.fullResponse());
server.use(_restify2.default.bodyParser());

__webpack_require__(6)(server);

server.listen(process.env.SERVER_PORT, function () {
    console.log('server listening at port ' + process.env.SERVER_PORT);

    _mongoose2.default.connect(process.env.DATABASE_URL + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_DBNAME);
    _mongoose2.default.connection.on('open', function () {
        console.log('mongo connected');
    });
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("restify");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("node-env-file");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _taskController = __webpack_require__(7);

var _taskController2 = _interopRequireDefault(_taskController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (server) {
    _taskController2.default.applyRoutes(server, '/' + process.env.API_PREFIX);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = __webpack_require__(8);

var _restifyErrors = __webpack_require__(1);

var _restifyErrors2 = _interopRequireDefault(_restifyErrors);

var _taskRepository = __webpack_require__(9);

var _taskRepository2 = _interopRequireDefault(_taskRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskController = new _restifyRouter.Router();
var taskRepository = new _taskRepository2.default();

TaskController.get('/tasks', function (req, res, next) {
    taskRepository.findAll().then(function (tasks) {
        return res.json({
            status: true,
            code: 200,
            data: tasks
        });
    }).catch(function (error) {
        return next(new _restifyErrors2.default.InternalServerError({ code: 500, message: 'error on query task' }));
    });
});

TaskController.post('/tasks', function (req, res, next) {
    taskRepository.create(req.body).then(function (task) {
        return res.send(201, {
            status: true,
            code: 201,
            data: task
        });
    }).catch(function (error) {
        console.log(error);
        return next(new _restifyErrors2.default.InternalServerError({ code: 500, message: 'error on create task' }));
    });
});

TaskController.put('/tasks/:id', function (req, res, next) {
    taskRepository.update(req.params.id, req.body).then(function (task) {
        return res.send(200, {
            status: true,
            code: 200,
            data: task
        });
    }).catch(function (error) {
        console.log(error);
        if (error.body.code === 'NotFound') {
            return next(new _restifyErrors2.default.NotFoundError({ code: 404, message: error.body.message }));
        } else {
            return next(new _restifyErrors2.default.InternalServerError({ code: 500, message: error.body.message }));
        }
    });
});

TaskController.del('/tasks/:id', function (req, res, next) {
    taskRepository.delete(req.params.id).then(function (isTaskRemoved) {
        res.send(204, '');
    }).catch(function (error) {
        console.log(error);
        if (error.body.code === 'NotFound') {
            return next(new _restifyErrors2.default.NotFoundError({ code: 404, message: error.body.message }));
        } else {
            return next(new _restifyErrors2.default.InternalServerError({ code: 500, message: error.body.message }));
        }
    });
});

exports.default = TaskController;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("restify-router");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(10);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(11);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(12);

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseRepository = __webpack_require__(13);

var _baseRepository2 = _interopRequireDefault(_baseRepository);

var _task = __webpack_require__(17);

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskRepository = function (_BaseRepository) {
    (0, _inherits3.default)(TaskRepository, _BaseRepository);

    function TaskRepository() {
        (0, _classCallCheck3.default)(this, TaskRepository);
        return (0, _possibleConstructorReturn3.default)(this, (TaskRepository.__proto__ || (0, _getPrototypeOf2.default)(TaskRepository)).call(this, _task2.default));
    }

    return TaskRepository;
}(_baseRepository2.default);

exports.default = TaskRepository;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(14);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _restifyErrors = __webpack_require__(1);

var _restifyErrors2 = _interopRequireDefault(_restifyErrors);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _co = __webpack_require__(16);

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseRepository = function () {
    function BaseRepository(model) {
        (0, _classCallCheck3.default)(this, BaseRepository);

        this.model = model;
    }

    (0, _createClass3.default)(BaseRepository, [{
        key: 'makeModel',
        value: function makeModel() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return new this.model(data);
        }
    }, {
        key: 'findAll',
        value: function findAll() {
            return this.model.find({});
        }
    }, {
        key: 'findById',
        value: function findById(id) {
            return this.model.find({ _id: id }).cursor().next();
        }
    }, {
        key: 'create',
        value: function create(data) {
            return this.makeModel(data).save();
        }
    }, {
        key: 'update',
        value: function update(id, data) {
            var query = this.model;
            return (0, _co2.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return query.findOne({ _id: id }).then(function () {
                                    return query.update({ _id: id }, { '$set': data }).then(function (task) {
                                        return query.findById(task._id);
                                    }).catch(function (err) {
                                        throw new _restifyErrors2.default.InternalServerError('problems in update');
                                    });
                                }).catch(function (err) {
                                    throw new _restifyErrors2.default.NotFoundError('document not found');
                                });

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            var query = this.model;
            return (0, _co2.default)(_regenerator2.default.mark(function _callee2() {
                var isTaskRemoved;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return query.findOne({ _id: id }).then(function () {
                                    return query.remove({ _id: id }).then(function () {
                                        return true;
                                    }).catch(function (err) {
                                        throw new _restifyErrors2.default.InternalServerError("can't remove the task");
                                    });
                                }).catch(function (err) {
                                    throw new _restifyErrors2.default.NotFoundError('document not found');
                                });

                            case 2:
                                isTaskRemoved = _context2.sent;
                                return _context2.abrupt('return', isTaskRemoved);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);
    return BaseRepository;
}();

exports.default = BaseRepository;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskSchema = new _mongoose2.default.Schema({
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    done: Boolean
});

var Task = _mongoose2.default.model('Task', TaskSchema);

exports.default = Task;

/***/ })
/******/ ]);