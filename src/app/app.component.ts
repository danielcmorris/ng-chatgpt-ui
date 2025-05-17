import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActiveChatComponent } from './active-chat/active-chat.component';
@Component({
  selector: 'app-root',
  imports: [ MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatDrawerContainer, MatDrawer, ActiveChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chatgpt-ui';
  showFiller = false;

}
