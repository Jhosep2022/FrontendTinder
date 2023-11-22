import { Component } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  items = [
    { imageUrl: 'url_imagen_1.jpg', text: 'Texto 1' },
    { imageUrl: 'url_imagen_2.jpg', text: 'Texto 2' },
    { imageUrl: 'url_imagen_3.jpg', text: 'Texto 3' },
    { imageUrl: 'url_imagen_4.jpg', text: 'Texto 4' },
    // Agrega más elementos según sea necesario
  ];
}
