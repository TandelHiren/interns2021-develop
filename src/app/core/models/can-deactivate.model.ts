
import { Observable } from 'rxjs/Observable';
/** ------------------------------------------------------------------------------- */

/**
 * the can Deactivate Interface to use when user wants to deactivate the component.
 * @author Hiren Tandel
 */
export interface DeactivateGuarded {
    /**
     * used for can deactivate component interaction.
     * @author Hiren Tandel
     */
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}