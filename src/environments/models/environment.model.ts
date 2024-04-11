import { BaseApiUrlModel } from "./baseapiurl.model";
import { FlagsModel } from "./flags.model";

export interface EnvironmentModel{
    flags: FlagsModel;

	baseapi: BaseApiUrlModel;
}