import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuBag, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  userMenu = [
    { title: 'header.profile' },
    { title: 'header.log_out' },
  ];


  // Mensagens a serem exibidas
  enterprise = 'Excalibur Quantum';
  slogan = 'Da Lenda à Inovação, Tecnologia que Transforma';

  displayedText = '';
  index = 0;
  typingSpeed = 250; // Velocidade de digitação em milissegundos
  deletingSpeed = 100; // Velocidade de exclusão em milissegundos
  delayBeforeDeleting = 8000; // Atraso antes de iniciar a exclusão
  isLogoEnterpriseVisible = true; // Variável para controlar a visibilidade da logo-enterprise

  private hideLogoTimeout: any;
  private typingTimeout: any;
  private deletingTimeout: any;

  constructor(
    private translate: TranslateService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.startTypingSequence();

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService.onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    // this.menuService.onItemClick()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((event) => this.onMenuItemClick(event));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    // Limpar timeouts para evitar vazamentos de memória
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.deletingTimeout) {
      clearTimeout(this.deletingTimeout);
    }
    if (this.hideLogoTimeout) {
      clearTimeout(this.hideLogoTimeout);
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  // onMenuItemClick(event: NbMenuBag) {
  //   const { item } = event;
  //   if (item.link === 'profile') {
  //     this.router.navigate(['/pages/profile']);
  //   }
  // }

  startTypingSequence() {
    this.displayedText = '';
    this.index = 0;
    this.typingTimeout = setTimeout(() => this.writerText(this.enterprise), 100);
    this.hideLogoTimeout = setTimeout(() => this.hideLogoEnterprise(), 40000);
  }

  writerText(text: string) {
    if (this.index < text.length) {
      this.displayedText += text.charAt(this.index);
      this.index++;
      this.typingTimeout = setTimeout(() => this.writerText(text), this.typingSpeed);
    } else {
      this.typingTimeout = setTimeout(() => this.deleteText(text), this.delayBeforeDeleting);
    }
  }

  deleteText(text: string) {
    if (this.displayedText.length > 0) {
      this.displayedText = this.displayedText.slice(0, -1);
      this.deletingTimeout = setTimeout(() => this.deleteText(text), this.deletingSpeed);
    } else {
      if (text === this.enterprise) {
        this.index = 0;
        this.typingTimeout = setTimeout(() => this.writerText(this.slogan), 100);
      }
    }
  }

  hideLogoEnterprise() {
    this.isLogoEnterpriseVisible = false;
  }
}
