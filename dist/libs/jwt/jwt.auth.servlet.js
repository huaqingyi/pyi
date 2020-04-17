"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extends_1 = require("../../extends");
const core_1 = require("../../core");
const decorators_1 = require("../../decorators");
const dto_1 = require("../../decorators/dto");
class PYIServlet extends core_1.PYICore {
    static _base() {
        return PYIServlet;
    }
    // tslint:disable-next-line:no-empty
    use(action, secretKey, context, next) { }
    // tslint:disable-next-line:no-empty
    notFound(secretKey, context, next) { }
    // tslint:disable-next-line:no-empty
    multiple(actions, secretKey, context, next) { }
}
exports.PYIServlet = PYIServlet;
class JWTAuthServlet extends PYIServlet {
    async use(action, secretKey, context, next) {
        const whites = (this.excludeJWT && await this.excludeJWT()) || [];
        if (whites.indexOf(action) !== -1) {
            return await next();
        }
        else {
            this.servlet(action, secretKey, context, next);
        }
    }
    async notFound(secretKey, context, next) {
        const dto = new dto_1.ResponseDto({});
        dto.errcode = 1404;
        const err = new Error('Not Found ...');
        context.body = await dto.throws(err);
        await next(context);
    }
    async multiple(actions, secretKey, context, next) {
        const dto = new dto_1.ResponseDto({});
        dto.errcode = 1404;
        const err = new Error('Multiple identical routers ...');
        context.body = await dto.throws(err);
        await next(context);
    }
}
exports.JWTAuthServlet = JWTAuthServlet;
function UseServlet(servlet) {
    return (target, key) => {
        if (target && target._base && target._base() === decorators_1.PYIController) {
            extends_1.UseBefore(servlet)(target, key);
        }
        else {
            console.error('Servlet is Controller actions decorators ...');
            return target;
        }
    };
}
exports.UseServlet = UseServlet;

//# sourceMappingURL=../../sourcemaps/libs/jwt/jwt.auth.servlet.js.map
