import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Observable,
  Subject,
  ReplaySubject,
  takeUntil,
  switchMap,
  take,
  combineLatest,
  map,
  tap,
  shareReplay,
} from 'rxjs';
import { User } from 'src/app/Models/user';
import { Destroyable } from 'src/app/Utils/destroyable';
import { DataProviderService } from './data-provider.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Destroyable {
  private userSub = new ReplaySubject<User>(1);
  private userTriggerSub = new Subject<void>();
  user$ = this.userSub.asObservable();

  set setUser(user: User) {
    this.userSub.next(user);
  }

  constructor(
    private dataProviderService: DataProviderService,
    private af: AngularFireAuth
  ) {
    super();

    combineLatest([this.userTriggerSub, this.af.authState])
      .pipe(
        map(([_, user]) => user),
        switchMap((user) => this.dataProviderService.getUser(user.uid)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (user) => this.userSub.next(user),
      });
  }

  public fetchUser() {
    this.userTriggerSub.next();
  }

  public getUser(id: string) {
    return this.dataProviderService.getUser(id);
  }
}