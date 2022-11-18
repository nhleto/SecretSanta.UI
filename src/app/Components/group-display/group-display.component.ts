import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupUpApiService } from '../../Services/group-up-api.service';
import { Destroyable } from '../../Utils/destroyable';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Group } from '../../Models/group';
import { Utility } from 'src/app/Utils/utility';
import { AuthService } from 'src/app/Services/auth.service';
import { DataProviderService } from 'src/app/Services/data-provider.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.scss'],
})
export class GroupDisplayComponent extends Utility implements OnInit {
  group$ = new Observable<Group>();
  user$ = new Observable<User[]>();
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private dataProviderService: DataProviderService,
    protected override angularFireAuth: AngularFireAuth,
    protected override router: Router
  ) {
    super(router, angularFireAuth);
  }

  ngOnInit(): void {
    const groupId = this._activatedRoute.snapshot.params['id'];

    this.group$ = this.dataProviderService.getGroup(groupId);
    this.user$ = this.group$.pipe(
      filter(group => !!group?.users),
      map(group => group.users)
    );
  }
}
