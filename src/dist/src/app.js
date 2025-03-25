"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var body_parser_1 = require("body-parser");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var routers_1 = require("./routers");
var src_1 = require("../common /src");
var app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
}));
app.set('trust proxy', true);
app.use((0, body_parser_1.urlencoded)({
    extended: false
}));
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
app.use(src_1.currentUser);
app.use(routers_1.signinRouter);
app.use(routers_1.signoutRouter);
app.use(routers_1.signupRouter);
app.use(src_1.requireAuth, routers_1.newPostRouter);
app.use(src_1.requireAuth, routers_1.deletepostRouter);
app.use(src_1.requireAuth, routers_1.updatedPostRouter);
app.use(src_1.requireAuth, routers_1.addImagesRouter);
app.use(src_1.requireAuth, routers_1.deleteImagesRouter);
app.use(routers_1.showpostRouter);
app.use(src_1.requireAuth, routers_1.newCommentRouter);
app.use(src_1.requireAuth, routers_1.deleteCommentRouter);
app.all('*', function (req, res, next) {
    var error = new Error('not found!');
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'something went wrong' });
});
