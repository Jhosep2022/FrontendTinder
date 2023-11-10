import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Message } from 'src/app/models/chat';
import { ProfileUser } from 'src/app/models/profile-user';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {
  chatPic: string = 'ruta/a/tu/imagen';
  chatName: string = 'Nombre del chat';
  messageControl = new FormControl('');
  messages$: Observable<{ message: string, date: Date }[]> = of([
    {
      message: 'Hola, ¿cómo estás?',
      date: new Date()
    },
    // ... otros mensajes
  ]);

  sendMessage() {
    if (this.messageControl.value) {
      // Tu lógica para enviar el mensaje y/o agregarlo a la lista de mensajes
      console.log('Mensaje enviado:', this.messageControl.value);
      this.messageControl.reset();
    }
  }
}
