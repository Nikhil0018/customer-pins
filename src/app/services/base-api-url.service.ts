import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';

@Injectable()
export class BaseApiUrl {
	public static BASE_API = environment.baseapi.base;
}
