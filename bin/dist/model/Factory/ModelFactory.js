"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_Reservation_1 = __importDefault(require("../model.Reservation"));
const model_Users_1 = __importDefault(require("../model.Users"));
class ModelFactory {
    getModelUsers() {
        return model_Users_1.default.new().get();
    }
    ;
    getModelReservation() {
        return model_Reservation_1.default.new().get();
    }
    ;
    static new() {
        return new this;
    }
}
exports.default = ModelFactory;
