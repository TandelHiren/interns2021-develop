/**
 * @author Hiren Tandel
 * @description used when user wants to go back from the route. (The CanDeactivate Guard.)
 */

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DeactivateGuarded } from '../../models/can-deactivate.model';
/** -------------------------------------------------------------- */

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<DeactivateGuarded> {

    /**
     * deactivate gaurd on component
     * @author Hiren Tandel
     * @param component The component from which user wants to go back
     */
    public canDeactivate(component: DeactivateGuarded): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
