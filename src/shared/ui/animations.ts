import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';

const TRANSITION_OFFSET = `10px`;
const TIMING_SECONDS_OPACITY = 0.125;
const TIMING_SECONDS_TRANSFORM = 0.1;

export const fadeInOutLeftRight = trigger('fadeInOutLeftRight', [
  transition(':enter', [
    style({ opacity: 0, transform: `translateX(-${TRANSITION_OFFSET})` }),
    group([
      animate(`${TIMING_SECONDS_OPACITY}s ease-in`, style({ opacity: 1 })),
      animate(
        `${TIMING_SECONDS_TRANSFORM}s ease-in`,
        style({ transform: 'translateX(0)' })
      ),
    ]),
  ]),
  transition(':leave', [
    group([
      animate(`${TIMING_SECONDS_OPACITY}s ease-out`, style({ opacity: 0 })),
      animate(
        `${TIMING_SECONDS_TRANSFORM}s ease-out`,
        style({ transform: `translateX(${TRANSITION_OFFSET})` })
      ),
    ]),
  ]),
]);

export const fadeInOutRightLeft = trigger('fadeInOutRightLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: `translateX(${TRANSITION_OFFSET})` }),
    group([
      animate(`${TIMING_SECONDS_OPACITY}s ease-in`, style({ opacity: 1 })),
      animate(
        `${TIMING_SECONDS_TRANSFORM}s ease-in`,
        style({ transform: 'translateX(0)' })
      ),
    ]),
  ]),
  transition(':leave', [
    group([
      animate(`${TIMING_SECONDS_OPACITY}s ease-out`, style({ opacity: 0 })),
      animate(
        `${TIMING_SECONDS_TRANSFORM}s ease-out`,
        style({ transform: `translateX(-${TRANSITION_OFFSET})` })
      ),
    ]),
  ]),
]);
