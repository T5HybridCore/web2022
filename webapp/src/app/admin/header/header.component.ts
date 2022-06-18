import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // View
  @ViewChild('signOut')
  public readonly signOut!: SwalComponent;

  // Attributes
  public readonly user: Observable<User | null> = EMPTY;

  // Constructor
  constructor(@Optional() private auth: Auth, private router: Router) {
    if (auth) this.user = authState(this.auth);
  }

  // OnInit
  ngOnInit(): void {
  }

  async openSignOutModal() {
    await this.signOut.fire();
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/admin/signin']);
  }
}
