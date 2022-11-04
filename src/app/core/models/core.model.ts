/**
 * @author
 *
 */

import { Observable } from 'rxjs/Observable';

/**
 * Params
 */
export class Params<T = any> {
    /**
     * Page  of params
     */
    public pageNumber: string;
    /**
     * Per page of params
     */
    public pageLimit: string;
    /**
     * Sort  of params
     */
    public sortBy: string;
    /** sort */
    public direction: string;
}

/** Model class for filterRecord. */
export class Filter {
    /**
     * Key  of locator filter record
     */
    public key: string;
    /**
     * Operation  of locator filter record
     */
    public operation:string;
    /**
     * Or predicate of locator filter record
     */
    public orPredicate: boolean = false;
    /**
     * Value  of locator filter record
     */
    public value: string
    constructor(
        key?: string,
        operation?: string,
        orPredicate?: boolean,
        value?: string
    ) {
        this.key = key;
        this.operation = operation;
        this.orPredicate = orPredicate;
        this.value = value;
    }
}
/**
 * Site base
 */
export class SiteBase {
    /** Holds name of current site */
    public name: string;
    /** Holds logo image path of current site. */
    public logo: string;
    /** Holds menus of current site. */
    public menus: Observable<Menu[]>;

    constructor(
        name: string,
        logo: string,
        menus: Observable<Menu[]>,
    ) {
        this.name = name;
        this.logo = logo;
        this.menus = menus;
    }
}

/**
 * Menu
 */
export class Menu {

    /**
     * Index  of menu
     */
    public index: number;

    /**
     * Name  of menu
     */
    public name: string;

    /**
     * Link  of menu
     */
    public link: string;

    /**
     * Icon  of menu
     */
    public icon: string;

    /**
     * Parent menu id of menu
     */
    public parentMenuId: string;

    /**
     * Permisison  of menu
     */
    public permisison: string[];

    /**
     * Determines whether route link is
     */
    public isRouteLink: boolean;

    /**
     * Determines whether open is
     */
    public isOpen: boolean;

    /**
     * Sub menus of menu
     */
    public subMenus: SubMenu[];

    /** visible menu */
    public isVisibleForUser?: boolean;

    constructor(
        index: number,
        name: string,
        link: string,
        icon: string,
        isOpen: boolean,
        permisison: string[],
        isRouteLink: boolean,
        subMenu?: SubMenu[],
        isVisibleForUser?:boolean

    ) {
        this.index = index;
        this.name = name;
        this.link = link;
        this.icon = icon;
        this.isOpen = isOpen;
        this.permisison = permisison;
        this.isRouteLink = isRouteLink;
        this.subMenus = subMenu || [];
        this.isVisibleForUser = isVisibleForUser;

    }
}

/**
 * Sub menu
 */
export class SubMenu {

    /**
     * Index  of sub menu
     */
    public index: number;

    /**
     * Name  of sub menu
     */
    public name: string;

    /**
     * Link  of sub menu
     */
    public link: string;
    /**
     * Permisison  of menu
     */
    public permisison: string[];

    /**
     * Icon  of sub menu
     */
    public icon: string;

    constructor(
        index: number,
        name: string,
        link: string,
        permisison: string[],
        icon: string) {
        this.index = index;
        this.name = name;
        this.link = link;
        this.icon = icon;
        this.permisison = permisison;
    }

}

/**
 * Break point enum
 */
export enum BreakPointEnum {
    IsMobile = 'mobile',
    IsDesktop = 'desktop'
}

/**
 * Modal size
 */
export enum ModalSize {
    /** Small */
    Small = 'small',
    /** Medium */
    Medium = 'medium',
    /** Large */
    Large = 'large'
}
/**
 * Menu Permission
 */
export enum Permisison {
    /** Admin */
    Admin = 'Admin',
    /** Manager */
    Manager = 'Manager',
    /** Lead */
    Lead = 'Lead',
    /** QA */
    QA = 'QA'
}


/** Role permission */
export class RolesPermissions {
  /** It contains roles */
  public roles: string[];
  /** It contains permission */
  public permissions : string[]
}
