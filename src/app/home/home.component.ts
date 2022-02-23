import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  msg:any;

  constructor(
    private authService: MsalService,
    private broadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.broadcastService.msalSubject$
      .pipe( filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((res: EventMessage) => {
          this.msg=res,
          console.log(res);
      });
      this.broadcastService.inProgress$
      .pipe( filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => { this.setLoginDisplay();})
  }
  setLoginDisplay() {
    this.loginDisplay=this.authService.instance.getAllAccounts().length>0;
  }
}
