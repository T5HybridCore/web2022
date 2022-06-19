import { Component, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  // View
  @ViewChild('wrongData')
  public readonly wrongData!: SwalComponent;

    // Attributes
    private readonly userDisposable: Subscription | undefined;
    public readonly user: Observable<User | null> = EMPTY;

  form: FormGroup;

  
constructor( @Optional() private auth: Auth, private apiService: ApiService, private router: Router) {
  if (auth) {
    this.user = authState(this.auth);

    this.userDisposable = authState(this.auth).pipe(
      traceUntilFirst('auth'),
      map(u => !!u)
    ).subscribe(isLoggedIn => {        
      if (isLoggedIn) {
        apiService.getCustomer(auth.currentUser?.uid ?? '').subscribe(async (user: any) => {
          if (user.customClaims && user.customClaims['admin']) {
            await this.wrongData.fire();
            await signOut(this.auth);
          }
        });
        //router.navigate(['/admin']);
      }
    });
  }

      // Form
      this.form = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'question': new FormControl('', Validators.required)
      });
}

    ngOnInit() {
     
    }
 

    async question() {

      //aqui va la funcion que manda el mensaje por nodejs al email del sitio
      /*await sendquestion(this.auth, this.form.value['question'], this.form.value['email'], this.form.value['password'])
        .then((user) => {
          
        })
        .catch(async (error) => {
          await this.wrongData.fire();        
        }); 
        
        */
    }



}
