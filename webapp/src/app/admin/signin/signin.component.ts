import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  // Properties
  title = 'Sign in';

  //private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = true;
  showLogoutButton = true;

  constructor(@Optional() private auth: Auth, private apiService: ApiService) {
    if (auth) {
      //this.user = authState(this.auth);
      /*this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });*/
    }
  }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((result: any) => {
      console.log(result);      
    });
  }

  ngOnDestroy(): void {
    /*if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }*/
  }

  async login() {
    //const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    const result = await signInWithEmailAndPassword(this.auth, 'T5HybridCore@gmail.com', 'Test123.');
    console.log(result);
    
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
