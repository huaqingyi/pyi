"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gyi_1 = require("./gyi");
var lodash_1 = require("lodash");
var gulp_1 = __importStar(require("gulp"));
var libs = __importStar(require("../libs"));
var TaskCore = /** @class */ (function (_super) {
    __extends(TaskCore, _super);
    function TaskCore() {
        var _this = _super.call(this) || this;
        _this.libs = lodash_1.map(libs, function (lib) { return lib; });
        return _this;
    }
    TaskCore.prototype.injectTask = function (name, key, option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.store[name])
                    this.store[name] = [];
                this.store[name].push({ key: key, option: option });
                return [2 /*return*/];
            });
        });
    };
    TaskCore.prototype.makeTask = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var name, instance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = mode.name;
                        instance = new mode;
                        return [4 /*yield*/, Promise.all(lodash_1.map(this.store[name], function (config) { return __awaiter(_this, void 0, void 0, function () {
                                var key, option, exec, _a, series, parallel;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            key = config.key, option = config.option;
                                            exec = (function () { return __awaiter(_this, void 0, void 0, function () {
                                                var end, destEnd, _a, src, dest, inject;
                                                var _this = this;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            destEnd = null;
                                                            if (!option.option) return [3 /*break*/, 3];
                                                            _a = option.option, src = _a.src, dest = _a.dest;
                                                            if (!src) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, gulp_1.default.src(src)];
                                                        case 1:
                                                            end = _b.sent();
                                                            _b.label = 2;
                                                        case 2:
                                                            if (dest)
                                                                destEnd = gulp_1.default.dest(dest);
                                                            _b.label = 3;
                                                        case 3:
                                                            inject = [];
                                                            if (option.inject && option.inject.length > 0) {
                                                                inject = lodash_1.map(option.inject, function (lib) {
                                                                    var LibInstance = lodash_1.find(_this.libs, function (item) { return item.name === lib.name; });
                                                                    if (LibInstance.name === 'Gulp')
                                                                        return gulp_1.default;
                                                                    if (!LibInstance) {
                                                                        if (option.option && option.option.injectable) {
                                                                            var injectable = option.option.injectable;
                                                                            if (injectable && injectable[lib.name])
                                                                                return new injectable[lib.name](end);
                                                                            return injectable;
                                                                        }
                                                                        return undefined;
                                                                    }
                                                                    return new LibInstance(end);
                                                                });
                                                            }
                                                            return [4 /*yield*/, instance[key].apply(instance, inject)];
                                                        case 4:
                                                            end = _b.sent();
                                                            if (!(end && destEnd !== null)) return [3 /*break*/, 6];
                                                            return [4 /*yield*/, end.pipe(destEnd)];
                                                        case 5:
                                                            end = _b.sent();
                                                            _b.label = 6;
                                                        case 6: return [2 /*return*/];
                                                    }
                                                });
                                            }); }).bind(this);
                                            if (!!option.option) return [3 /*break*/, 2];
                                            return [4 /*yield*/, gulp_1.default.task(key, exec)];
                                        case 1: return [2 /*return*/, _b.sent()];
                                        case 2:
                                            _a = option.option, series = _a.series, parallel = _a.parallel;
                                            if (!series) return [3 /*break*/, 4];
                                            return [4 /*yield*/, gulp_1.default.task(key, gulp_1.series.apply(void 0, series.concat([exec])))];
                                        case 3: return [2 /*return*/, _b.sent()];
                                        case 4:
                                            if (!parallel) return [3 /*break*/, 6];
                                            return [4 /*yield*/, gulp_1.default.task(key, gulp_1.parallel.apply(void 0, parallel.concat([exec])))];
                                        case 5: return [2 /*return*/, _b.sent()];
                                        case 6:
                                            if (series && parallel) {
                                                return [2 /*return*/, new Error("series not have parallel ...")];
                                            }
                                            _b.label = 7;
                                        case 7: return [4 /*yield*/, gulp_1.default.task(key, exec)];
                                        case 8: return [2 /*return*/, _b.sent()];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskCore;
}(gyi_1.GYI));
exports.TaskCore = TaskCore;

//# sourceMappingURL=../sourcemaps/core/task.core.js.map
