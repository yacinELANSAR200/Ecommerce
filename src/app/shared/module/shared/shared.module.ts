import { NgModule, ViewEncapsulation } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        ButtonModule,
        ReactiveFormsModule,
        MessagesModule,
        PasswordModule,
        ToastModule,
        NgxSpinnerModule,
  ],
  exports:[
    FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        ButtonModule,
        ReactiveFormsModule,
        MessagesModule,
        PasswordModule,
        ToastModule,
        NgxSpinnerModule,
  ],
  providers: [MessageService],
})
export class SharedModule { }
