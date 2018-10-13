import { TokenService } from '../token/token.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpHeaderResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent
    | HttpResponse<any> | HttpUserEvent<any>> {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      const viaCep: boolean = /https:\/\/viacep.com.br\/ws\/\/*.*/g.test(req.url);
      if (!viaCep) {
        req = req.clone({
          setHeaders: {
            'x-access-token': token
          }
        });
      }
    }
    return next.handle(req);
  }
}
