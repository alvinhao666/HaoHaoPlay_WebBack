import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.less']
})
export class PersonalComponent implements OnInit, OnDestroy {

  private router$: Subscription;
  menus: any[] = [
    {
      key: 'base',
      title: '基本设置',
    },
    {
      key: 'security',
      title: '安全设置',
    }
  ];

  constructor(
    private router: Router) {
    this.router$ = this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.setActive());
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
  }


  to(item: any) {
    this.router.navigateByUrl(`/main/personal/${item.key}`);
  }
}
