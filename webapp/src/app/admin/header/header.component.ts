import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

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
  userName: string = 'Alex Zamarripa';

  constructor() { }

  ngOnInit(): void {
  }

  async openSignOutModal() {
    await this.signOut.fire();
  }
}
