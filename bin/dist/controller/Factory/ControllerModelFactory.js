"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelFactory_1 = __importDefault(require("../../model/Factory/ModelFactory"));
class ControllerModelFactory {
    ModelUser() {
        return ModelFactory_1.default.new().getModelUsers();
    }
    ;
    ModelReservation() {
        return ModelFactory_1.default.new().getModelReservation();
    }
    ;
    static new() {
        return new this;
    }
}
exports.default = ControllerModelFactory;
