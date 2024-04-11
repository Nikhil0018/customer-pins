import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req);
		
		// next.handle(req).pipe(
		// 	catchError((error: HttpErrorResponse) => {
		// 		if (error instanceof HttpErrorResponse) {
		// 			console.log(error.error);
		// 		}
		// 		return throwError(error);
		// 	})
		// );
	}
}
