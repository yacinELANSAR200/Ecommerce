import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProducts } from '../../../core/interfaces/http';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  onImageError(event: Event) {
  (event.target as HTMLImageElement).src =
    'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692257709689-logitech%20heaphone.jpg';
}
}
