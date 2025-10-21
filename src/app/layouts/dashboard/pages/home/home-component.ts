import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {StatusPipe} from '../../../../pipes/status-pipe';
import {UseTimePipe} from '../../../../pipes/use-time-pipe';
import {ResourceService} from '../../../../services/resource-service';
import {ResourceList} from '../../../../models/resource/resource-list';
import {UserService} from '../../../../services/user-service';
import {AuthService} from '../../../../services/auth-service';
import {Tag} from 'primeng/tag';
import {DatePipe, NgStyle} from '@angular/common';
import {LoanStatusPipe} from '../../../../pipes/loan-status-pipe';
import {LoanService} from '../../../../services/loan-service';
import {LoanList} from '../../../../models/loan/loan-list';
import {Divider} from 'primeng/divider';
import {Skeleton} from 'primeng/skeleton';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TableModule,
    StatusPipe,
    UseTimePipe,
    Tag,
    DatePipe,
    LoanStatusPipe,
    Divider,
    NgStyle,
    Skeleton
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.sass'
})
export class HomeComponent {

  private resourceService: ResourceService = inject(ResourceService);
  loanService: LoanService = inject(LoanService);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);

  first: number = 0;
  page = signal(0);
  size = signal(10);
  isLoading: WritableSignal<boolean> = signal(true);

  userName: WritableSignal<string> = signal("");

  resourceList: WritableSignal<ResourceList> =  signal({currentPage: 0, totalItems: 0, totalPages: 0, resources: [] });

  loanList: WritableSignal<LoanList> = signal({currentPage: 0, totalItems: 0, totalPages: 0, loans: [] });

  constructor() {
    const userId = this.authService.getUserId();

    effect(() => {
      this.isLoading.set(true);

      const resources$ = this.resourceService.getResourceList(this.page(), this.size(), 'UNDER_MAINTENANCE');
      const loans$ = this.loanService.getLoanList(this.page(), this.size(), 'OVERDUE');
      const user$ = this.userService.getUser(userId!);

      forkJoin({
        resources: resources$,
        loans: loans$,
        user: user$
      }).subscribe({
        next: (data) => {
          this.resourceList.set(data.resources);
          this.loanList.set(data.loans);
          this.userName.set(data.user.name.split(" ")[0]);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error("Error fetching data for home page", err);
          this.isLoading.set(false);
        }
      });
    });
  }
}
