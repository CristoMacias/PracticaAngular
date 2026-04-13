import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'Card',
  imports: [MatCardModule, TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  cards = [
    { texto: "CARDS.TEXTO1", imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/015/275/318/small/beautiful-beach-tropical-beach-background-as-summer-landscape-white-sand-and-calm-sea-for-beach-banner-perfect-beach-scene-vacation-and-summer-holiday-concept-boost-up-color-process-photo.jpg" },
    { texto: "CARDS.TEXTO2", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEN6j8RkJjN5K8TECwwq609_BVzjgggcl58w&s" },
    { texto: "CARDS.TEXTO3", imageUrl: "https://lageografia.com/wp-content/uploads/rio-1.jpg" }
  ];
  ngAfterViewInit() {
    gsap.from('.card', { opacity: 0, y:-100, duration: 1, ease: 'power1.out' });
  }


}
