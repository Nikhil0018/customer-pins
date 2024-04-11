import { CustomerModel } from "./customer.model";

export interface PinModel {
    id?: number;
    title: string;
    image: File | string; // Can be either file or url
    collaboratory: CustomerModel[];
    privacy: string;
}