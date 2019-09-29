"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pyi_1 = require("pyi");
const node_schedule_1 = require("node-schedule");
const colors_1 = require("colors");
let Schedule = class Schedule extends pyi_1.PYIComponent {
    async test() {
        return await node_schedule_1.scheduleJob({ second: 1 }, async () => {
            return await console.log(colors_1.red('The answer to life, the universe, and everything!'));
        });
    }
};
Schedule = __decorate([
    pyi_1.Component
], Schedule);
exports.Schedule = Schedule;

//# sourceMappingURL=../sourcemaps/components/schedule.js.map
