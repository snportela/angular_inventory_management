import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {TableModule} from 'primeng/table';
import {UserService} from '../../../../services/user-service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {UserList} from '../../../../models/user/user-list';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-user-component',
  imports: [
    IconField,
    InputIcon,
    InputText,
    RouterLink,
    TableModule,
    NgStyle
  ],
  templateUrl: './user-component.html',
  styleUrl: './user-component.sass'
})
export class UserComponent {

  userService:UserService = inject(UserService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  first: number = 0;
  page = signal(0);
  size = signal(10);

  userList: WritableSignal<UserList> = signal({currentPage: 0, totalPages: 0, totalItems: 0, users: []});

  constructor() {
    effect(() => {
      this.userService.getUserList(this.page(), this.size()).subscribe(data => {
        this.userList.set(data);
      })
    });

  }

  confirmDelete(user: {userId: string; name: string}) {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir o usuário "${user.name}"?`,
        header: 'Confirmar Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, excluir',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

        accept: () => {
          this.userService.deleteUser(user.userId).subscribe({
            next: () => {
              this.userList.update(currentState => {
                const updatedUsers = currentState.users.filter(u => u.userId !== user.userId);
                return {...currentState, users: updatedUsers};
              });

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário "${user.name}" excluído.`,
                life: 3000
              });
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Não foi possível excluir o usuário.',
                life: 3000
              });
              console.error('Delete failed', err);
            }
          })
        }
      })
  }

}
