import { CustomerModel } from "./customer.model";

export interface PinModel {
    title: string;
    image: string;
    collaboratory: CustomerModel[];
    privacy: string;
}