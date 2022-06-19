import { Component, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User, signInWithEmailAndPassword } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // View
  @ViewChild('wrongData')
  public readonly wrongData!: SwalComponent;

  // Modal
  modal: any;

  // Attributes
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  // Form
  form: FormGroup;

  // Constructor
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
    this.form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  // OnInit
  ngOnInit(): void {
    this.modal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  openModal(): void {
    this.modal.show();
  }

  async login() {
    await signInWithEmailAndPassword(this.auth, this.form.value['email'], this.form.value['password'])
      .then((user) => {
        //this.router.navigate(['/admin']);
        this.modal.hide();
      })
      .catch(async (error) => {
        await this.wrongData.fire();        
      });
  }
}