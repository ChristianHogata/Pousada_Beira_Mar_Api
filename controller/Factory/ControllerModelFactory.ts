import { IControllerModelFactory } from "../Interfaces/ControllerInterface";
import ModelFactory from "../../model/Factory/ModelFactory";
import { IModel } from "../../model/Interfaces/ModelInterfaces";

class ControllerModelFactory implements IControllerModelFactory{

    ModelUser(): IModel{
        return ModelFactory.new().getModelUsers();
    };

    ModelReservation(): IModel{
        return ModelFactory.new().getModelReservation();
    };

    static new(){
        return new this;
    }
}

export default ControllerModelFactory;