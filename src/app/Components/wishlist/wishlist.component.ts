import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  user$: Observable<User>;
  wishListForm: FormGroup;

  get items() {
    return this.wishListForm.controls['items'] as FormArray;
  }

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.user$.pipe(
      map(({wishList}) => wishList.map(item => this.fb.control({value: item, disabled: true})))
    )
    .subscribe(data => {
      this.wishListForm = this.fb.group({
        items: this.fb.array(data)
      })
    });
  }

  addWishListItem() {
    this.items.push(this.fb.control(''));
  }

  enableForm(index) {
    this.items.controls[index].enable();
  }

  disableForm(index) {
    this.items.controls[index].disable();
  }
}
