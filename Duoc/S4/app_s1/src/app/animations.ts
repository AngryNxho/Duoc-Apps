import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.5s ease-in', style({ opacity: 0 }))
  ])
]);

export const buttonClickAnimation = trigger('buttonClickAnimation', [
  transition('* => *', [
    animate('0.1s ease-in', style({ transform: 'scale(0.9)' })),
    animate('0.1s ease-out', style({ transform: 'scale(1)' }))
  ])
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }), // Entra desde la derecha
    animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [
    animate('0.5s ease-in', style({ transform: 'translateX(-100%)' })) // Sale hacia la izquierda
  ])
]);
