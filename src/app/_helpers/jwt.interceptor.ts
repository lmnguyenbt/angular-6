import { Injectable } from "@angular/core";
import { Observable } from "rxjs/index";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";

@Injectable( { providedIn: 'root' } )
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        return next.handle(request);
    }
}
