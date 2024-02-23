export interface IModelFactory{
    getModelUsers(): IModel;
    getModelReservation(): IModel;
}

export interface IModel{
    get(): IModel
    UseModel(): any
}