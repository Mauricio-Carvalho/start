import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserTableData } from '../../../@core/data/user-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnDestroy {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {},
  };

  source: LocalDataSource = new LocalDataSource();
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService,
              private service: UserTableData) {
    this.loadTableSettings();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTableSettings();
    });

    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadTableSettings() {
    this.settings.columns = {
      id: {
        title: this.translate.instant('user.table.id'),
        type: 'number',
      },
      firstName: {
        title: this.translate.instant('user.table.first_name'),
        type: 'string',
      },
      lastName: {
        title: this.translate.instant('user.table.last_name'),
        type: 'string',
      },
      username: {
        title: this.translate.instant('user.table.username'),
        type: 'string',
      },
      email: {
        title: this.translate.instant('user.table.email'),
        type: 'string',
      },
      age: {
        title: this.translate.instant('user.table.age'),
        type: 'number',
      },
    };
  }

  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.instant('user.confirm_delete'))) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
