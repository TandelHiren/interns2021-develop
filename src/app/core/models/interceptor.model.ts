/**
 * @author
 */

import { InjectionToken } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthInterceptor } from '../services/interceptor/auth.interceptor';

/**
 * Interceptor model
 */
export class Interceptor {
    /**
     * Provide  of interceptor
     */
    public provide: InjectionToken<HttpInterceptor[]>;
    /**
     * Use class of interceptor
     */
    public useClass: typeof AuthInterceptor;
    /**
     * Multi  of interceptor
     */
    public multi: boolean;
}
/**
 * provides the Toaster title throughout the application
 * @author Hiren Tandel
 */
export enum MessageTitles {
    /** provides Susscess title for success toaster */
    Success = 'Success!',
    /** provides error title for error toaster */
    Error = 'Error!',
    /** provides warning title for warning toaster */
    Warning = 'Warning!',
    /** provides InvalidAccess title for InvalidAccess toaster */
    InvalidAccess = 'Invalid Access'
}

/**
 * `
 * @author: hiren Tandel
 * @description: It indicate status code of the API
 */
export enum Messages {
    /** provide all server comman error message */
    MessageForCommonError = 'Facing issues. Please try again later.',
    /** provide unauthorized error message */
    MessageForUnauthorized = 'You don\'t have permission to access the data for this page.',
    /** provide message if token is expired */
    MessageForUnauthorizedToken = 'Session Expired. Please login again.',
     /** provide message if file is not found */
    MessageForFileNotFound ='File not found'

}
