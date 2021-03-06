import { Component, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User, signInWithEmailAndPassword } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  // Properties
  title = 'Sign in';

  // View
  @ViewChild('wrongData')
  public readonly wrongData!: SwalComponent;

  // Attributes
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  // Form
  form: UntypedFormGroup;

  constructor(@Optional() private auth: Auth, private router: Router) {
    if (auth) {
      this.user = authState(this.auth);

      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        if (isLoggedIn) router.navigate(['/admin']);
      });
    }

    // Form
    this.form = new UntypedFormGroup({
      'email': new UntypedFormControl('', Validators.required),
      'password': new UntypedFormControl('', Validators.required)
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    await signInWithEmailAndPassword(this.auth, this.form.value['email'], this.form.value['password'])
      .then((user) => {
        //this.router.navigate(['/admin']);
      })
      .catch(async (error) => {
        await this.wrongData.fire();        
      });
  }
}