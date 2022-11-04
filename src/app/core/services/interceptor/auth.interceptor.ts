import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { DatePipe } from "@angular/common";
/** ------------------------------------------------------------------------------- */
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../loader/loader.service';
import { Messages, MessageTitles } from '../../models/interceptor.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, finalize } from 'rxjs/operators';
/**
 * provides the global error handling using HttpInterceptor.
 * And interceptor that appends auth token to every outgoing requests.
 * @author Hiren Tandel
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /** the message for toaster. */
  private message: string;
  /** the message Title for toaster. */
  private messageTitle: string;
  constructor(
    // private toaster: ToastrService,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { }

  /**
   * intercept the Http Request to handel the Error for user understanding.
   * @author Hiren Tandel
   * @param request the Http Request to handle the error
   * @param next will handle the Error.
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
    HttpHeaderResponse |
    HttpProgressEvent |
    HttpResponse<object> |
    HttpUserEvent<object> |
    HttpEvent<any>> {
    this.loaderService.showLoader(true);
    const token: string = this.authService.accessToken();
    request = request.clone({
      setHeaders: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Authorization': `Bearer ${token}`,
        zoneOffset: this.getZoneOffset()
      }
    });
    return next.handle(request)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          let message: string = '';
          this.messageTitle = MessageTitles.Error;

          if (errorResponse && errorResponse.error instanceof ErrorEvent) {
            message = `Error: ${errorResponse && errorResponse.error}`;
          } else {
            //message = `${errorResponse && errorResponse.error && errorResponse.error.message}`;
            switch (errorResponse.status) {
              case 401:
                message = Messages.MessageForUnauthorizedToken;
                this.authService.logout();
                break;
              case 403:
                message = Messages.MessageForUnauthorized;
                break;
              case 404:
                message = (errorResponse.error && errorResponse.error.message) ? errorResponse.error.message : Messages.MessageForFileNotFound;
                break;
              default:
                message = (errorResponse.error) ? errorResponse.error.message : '';
                break;
            }
          }
          // this.toaster.error(message, this.messageTitle);
          return throwError(message);
        }),
        finalize(() => this.loaderService.showLoader(false))
      );
  }

  private getZoneOffset() {
    const todaysDate = new Date();
    return new DatePipe("en-US").transform(todaysDate, "ZZZZZ");
  }
}

