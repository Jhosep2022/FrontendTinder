import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match-component',
  templateUrl: './match-component.component.html',
  styleUrls: ['./match-component.component.css']
})
export class MatchComponentComponent {
  @Input() item: any; // Asegúrate de ajustar el tipo de 'item' según tus necesidades
}
