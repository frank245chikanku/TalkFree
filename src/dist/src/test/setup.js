"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_memory_server_1 = require("mongodb-memory-server");
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = require("../app");
var supertest_1 = __importDefault(require("supertest"));
var mongo;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var mongoUri;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.env.JWT_KEY = 'chikanku';
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                return [4 /*yield*/, mongodb_memory_server_1.MongoMemoryServer.create()];
            case 1:
                mongo = _a.sent();
                return [4 /*yield*/, mongo.getUri()];
            case 2:
                mongoUri = _a.sent();
                return [4 /*yield*/, mongoose_1.default.connect(mongoUri)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var collections, _i, collections_1, collection;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.collections())];
            case 1:
                collections = _b.sent();
                if (!collections)
                    return [2 /*return*/];
                _i = 0, collections_1 = collections;
                _b.label = 2;
            case 2:
                if (!(_i < collections_1.length)) return [3 /*break*/, 5];
                collection = collections_1[_i];
                return [4 /*yield*/, collection.deleteMany({})];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongo.stop()];
            case 1:
                _a.sent();
                return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var globalsignin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, cookie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/signup').send({
                    email: "email@email.com",
                    password: "123456"
                }).expect(201)];
            case 1:
                res = _a.sent();
                cookie = res.get('Set-Cookie');
                return [2 /*return*/, cookie];
        }
    });
}); };
function beforeAll(arg0) {
    throw new Error('Function not implemented.');
}
function beforeEach(arg0) {
    throw new Error('Function not implemented.');
}
function afterAll(arg0) {
    throw new Error('Function not implemented.');
}
