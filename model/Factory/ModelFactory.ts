import { IModelFactory, IModel } from "../Interfaces/ModelInterfaces";
import ModelReservation from "../model.Reservation";
import ModelUser from "../model.Users";

class ModelFactory implements IModelFactory{
    
    getModelUsers(): IModel{
        return ModelUser.new().get();
    };

    getModelReservation(): IModel{
        return ModelReservation.new().get();
    };

    static new(){
        return new this;
    }
}

export default ModelFactory;