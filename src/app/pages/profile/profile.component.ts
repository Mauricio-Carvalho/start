import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

import { UserData } from '../../@core/data/users';
import { LayoutService } from '../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent  implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  languages = [
    {
      value: 'en',
      name: 'english',
    },
    {
      value: 'es',
      name: 'spanish',
    },
    {
      value: 'pt',
      name: 'portuguese',
    },
  ];

  currentLanguage = 'pt';

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'dark';

  constructor(private translate: TranslateService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('currentLanguage');
    this.currentLanguage = savedLanguage ? savedLanguage : this.currentLanguage;
    this.translate.setDefaultLang(this.currentLanguage);

    this.currentTheme = this.themeService.currentTheme;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLanguage(languageName: string) {
    this.translate.use(languageName);
    this.currentLanguage = languageName;
    localStorage.setItem('currentLanguage', languageName);
  }
}
