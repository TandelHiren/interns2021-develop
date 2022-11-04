/**
 * @author
 * sidebar menu list and menu permissions
 */
import { Menu, Permisison } from '../../models/core.model';

export const menuItem: Menu[] = [
    // {
    //     index: 0,
    //     name: 'Dashboard',
    //     link: '/dashboard',
    //     icon: 'icon-dashboard icon-submenu',
    //     parentMenuId: null,
    //     isOpen: false,
    //     permisison: [Permisison.Admin,Permisison.Lead, Permisison.Manager,Permisison.QA],
    //     isRouteLink: true,
    //     subMenus: []
    // },
    {
        index: 1,
        name: 'Application',
        link: '/application',
        icon: 'icon-application icon-submenu',
        parentMenuId: null,
        isOpen: false,
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA],
        isRouteLink: true,
        subMenus: []
    },
    {
        index: 2,
        name: 'Settings',
        link: '/settings',
        icon: 'icon-settings icon-submenu',
        parentMenuId: null,
        isOpen: false,
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager],
        isRouteLink: true,
        subMenus: [
            {
                index: 0,
                name: 'User Management',
                link: '/settings/users',
                icon: 'icon-User-Management icon-submenu',
                permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager]
            },
            {
                index: 1,
                name: 'Application Access',
                link: '/settings/application-access',
                icon: 'icon-submenu icon-Application-Access',
                permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager]
            }
        ]
    },
    {
        index: 3,
        name: 'Documentation',
        link: '/user-manual',
        icon: 'icon-user-manual icon-submenu',
        parentMenuId: null,
        isOpen: false,
        permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager, Permisison.QA],
        isRouteLink: true,
        subMenus: [
            // {
            //     index: 0,
            //     name: 'User Management',
            //     link: '/settings/users',
            //     icon: 'icon-execution-history icon-submenu',
            //     permisison: [Permisison.Admin, Permisison.Lead, Permisison.Manager,Permisison.QA]
            // },
        ]
    }
]


/**
 * Modal size
 */
export enum MenuListEnum {
    /** Small */
    Application = 'application',
    /** Medium */
    Detail = 'detail',
    /** Large */
    Overview = 'overview'
}
