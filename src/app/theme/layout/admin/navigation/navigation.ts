import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'Menu',
    title: 'MENU',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'Home',
        title: 'Home',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }
    ]
  },
  {
    id: 'Activity',
    title: 'Activity',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'Options',
        type: 'collapse',
        icon: 'feather icon-list',
        children: [
          {
            id: 'button',
            title: 'My Item',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Inventories',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Organization',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Message' + ' (2)' ,
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Contact Us',
            type: 'item',
            url: '/basic/tabs-pills'
          }
          // {
          //   id: 'typography',
          //   title: 'Typography',
          //   type: 'item',
          //   url: '/basic/typography'
          // }
        ]
      }
    ]
  },
  {
    id: 'forms',
    title: 'Checkpoint App',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms-element',
        title: 'About',
        type: 'item',
        url: '/forms/basic',
        classes: 'nav-item',
        icon: 'feather icon-cloud'
      }
      // {
      //   id: 'tables',
      //   title: 'Tables',
      //   type: 'item',
      //   url: '/tables/bootstrap',
      //   classes: 'nav-item',
      //   icon: 'feather icon-server'
      // }
    ]
  },
  {
    id: 'chart-maps',
    title: 'Data',
    type: 'group',
    icon: 'icon-charts',
    children: [
      {
        id: 'charts',
        title: 'My Statistics',
        type: 'item',
        url: '/charts/morris',
        classes: 'nav-item',
        icon: 'feather icon-activity'
      },
      {
        id: 'sample-page',
        title: 'My Note',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-clipboard'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Master Register',
            type: 'item',
            url: 'coming soon',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Login as Master',
            type: 'item',
            url: 'coming soon',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
