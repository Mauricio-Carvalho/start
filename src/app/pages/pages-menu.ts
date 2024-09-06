import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

export function getMenuItems(translate: TranslateService): NbMenuItem[] {
  return [
    {
      title: translate.instant('menu.title'),
      group: true,
    },
    {
      title: translate.instant('menu.list.tables.title'),
      icon: 'grid-outline',
      children: [
        {
          title: translate.instant('menu.list.tables.user'),
          link: '/pages/tables/user-table',
        },
        {
          title: translate.instant('menu.list.tables.supply'),
          link: '/pages/tables/user-table',
        },
        {
          title: translate.instant('menu.list.tables.machine'),
          link: '/pages/tables/user-table',
        },
      ],
    },
    {
      title: translate.instant('menu.list.auth.title'),
      icon: 'lock-outline',
      children: [
        {
          title: translate.instant('menu.list.auth.login'),
          link: '/auth/login',
        },
        {
          title: translate.instant('menu.list.auth.register'),
          link: '/auth/register',
        },
        {
          title: translate.instant('menu.list.auth.request-password'),
          link: '/auth/request-password',
        },
        {
          title: translate.instant('menu.list.auth.reset-password'),
          link: '/auth/reset-password',
        },
      ],
    },
  ];
}
