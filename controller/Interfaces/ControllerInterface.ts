import { IModel } from "../../model/Interfaces/ModelInterfaces";

export interface IRouters{
    setRouterParams(): IRouterParams;
    Exec(): void;
}

export interface IRouterParams{
    SetRouter(router:any): IRouterParams;
    SetAuthentic(set: boolean): IRouterParams;
    SetSendMail(set: boolean): IRouterParams;
    _EndParams(): IRouters
}

export interface emailFactory{
    setEmailParams(): emailParams;
    SendEmail(): void;
}

export interface emailParams{
    Setfrom(from: string): emailParams,
    Setto(to:string): emailParams,
    Setsubject(subject: string): emailParams,
    Settext(text: string): emailParams
    _EndParams(): emailFactory
}

export interface IControllerModelFactory{
    ModelUser(): IModel;
    ModelReservation(): IModel;
}
