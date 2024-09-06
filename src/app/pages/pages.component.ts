import { Component, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { getMenuItems } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[];
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService) {
    this.menu = getMenuItems(this.translate);
    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.menu = getMenuItems(this.translate);
    });
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}
