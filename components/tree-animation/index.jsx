'use client';

import { cn } from '@/utils/cn';

const AnimatedTree = ({ className }) => {
  return (
    <svg
      viewBox="0 0 610 660"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('tree-svg', className)}
    >
      {/* Left branches - smoother curves with natural downward flow */}
      {/* Left branches */}
      <path
        id="left-outer"
        d="M 10 41.8 C 9 168.8 62 180.8 97 200.8 C 186 236.8 223 235.8 253 260.8 C 278 282.8 305 300.8 305 500 L 305 650"
        fill="none"
        stroke="#0A5B5B"
        strokeWidth="1"
      />

      <path
        id="left-inner"
        d="M 95.3125 41.8 C 94.6 132.2875 132.3625 140.8375 157.3 155.0875 C 220.7125 180.7375 247.075 180.025 268.45 197.8375 C 286.2625 213.5125 305.5 226.3375 305 500 L 305 650"
        fill="none"
        stroke="#0A5B5B"
        strokeWidth="1"
      />

      {/* Center trunk */}
      <path
        id="center"
        d="M 305,50 L 305,650"
        fill="none"
        stroke="#0A5B5B"
        strokeWidth="1"
      />

      {/* Right branches */}
      <path
        id="right-inner"
        d="M 514.6875 41.8 C 515.4 132.2875 477.6375 140.8375 452.7 155.0875 C 389.2875 180.7375 362.925 180.025 341.55 197.8375 C 323.7375 213.5125 304.5 226.3375 305 500 L 305 650"
        fill="none"
        stroke="#0A5B5B"
        strokeWidth="1"
      />

      <path
        id="right-outer"
        d="M 600 41.8 C 601 168.8 548 180.8 513 200.8 C 424 236.8 387 235.8 357 260.8 C 332 282.8 305 300.8 305 500 L 305 650"
        fill="none"
        stroke="#0A5B5B"
        strokeWidth="1"
      />

      {/* Fixed circles at endpoints */}
      <circle cx="305" cy="650" r="6" fill="#0A5B5B" />

      {/* Static Coil near the bottom of the center line */}
      <path
        d="M 305.189 550.1182 C 306.4183 550.1385 307.6498 550.0913 308.813 549.9787 C 309.9762 549.8662 311.0495 549.69 311.9705 549.4613 C 312.8915 549.2325 313.643 548.955 314.1815 548.6453 C 314.72 548.3355 315.035 547.9987 315.1085 547.6545 C 315.182 547.3102 315.0125 546.9653 314.6105 546.6397 C 314.2085 546.3143 313.5807 546.0143 312.764 545.7562 C 311.9472 545.4982 310.9565 545.2875 309.8495 545.1368 C 308.7425 544.986 307.5403 544.8975 306.311 544.8773 M 305.1275 523.8668 C 302.7485 523.8225 300.5202 523.5263 298.8942 523.038 C 297.2682 522.5497 296.3675 521.9063 296.375 521.2387 C 296.3825 520.5713 297.299 519.93 298.9363 519.4447 C 300.5735 518.9595 302.8093 518.667 305.189 518.6273 M 305.189 576.3682 C 306.4183 576.3885 307.6498 576.3413 308.813 576.2287 C 309.9762 576.1162 311.0495 575.94 311.9705 575.7113 C 312.8915 575.4825 313.643 575.205 314.1815 574.8953 C 314.72 574.5855 315.035 574.2487 315.1085 573.9045 C 315.182 573.5602 315.0125 573.2153 314.6105 572.8897 C 314.2085 572.5643 313.5807 572.2643 312.764 572.0062 C 311.9472 571.7482 310.9565 571.5375 309.8495 571.3868 C 308.7425 571.236 307.5403 571.1475 306.311 571.1273 M 305.1275 550.1168 C 302.7485 550.0725 300.5202 549.7763 298.8942 549.288 C 297.2682 548.7997 296.3675 548.1563 296.375 547.4887 C 296.3825 546.8213 297.299 546.18 298.9363 545.6947 C 300.5735 545.2095 302.8093 544.917 305.189 544.8773 M 315.125 526.4977 C 315.125 525.048 310.928 523.8727 305.75 523.8727 C 300.572 523.8727 296.375 525.048 296.375 526.4977 C 296.375 527.9475 300.572 529.1227 305.75 529.1227 C 310.928 529.1227 315.125 527.9475 315.125 526.4977 z M 315.125 531.7477 C 315.125 530.298 310.928 529.1227 305.75 529.1227 C 300.572 529.1227 296.375 530.298 296.375 531.7477 C 296.375 533.1975 300.572 534.3727 305.75 534.3727 C 310.928 534.3727 315.125 533.1975 315.125 531.7477 z M 315.125 536.9977 C 315.125 535.548 310.928 534.3727 305.75 534.3727 C 300.572 534.3727 296.375 535.548 296.375 536.9977 C 296.375 538.4475 300.572 539.6227 305.75 539.6227 C 310.928 539.6227 315.125 538.4475 315.125 536.9977 z M 315.125 542.2477 C 315.125 540.798 310.928 539.6227 305.75 539.6227 C 300.572 539.6227 296.375 540.798 296.375 542.2477 C 296.375 543.6975 300.572 544.8727 305.75 544.8727 C 310.928 544.8727 315.125 543.6975 315.125 542.2477 z M 315.125 552.7477 C 315.125 551.298 310.928 550.1227 305.75 550.1227 C 300.572 550.1227 296.375 551.298 296.375 552.7477 C 296.375 554.1975 300.572 555.3727 305.75 555.3727 C 310.928 555.3727 315.125 554.1975 315.125 552.7477 z M 315.125 557.9977 C 315.125 556.548 310.928 555.3727 305.75 555.3727 C 300.572 555.3727 296.375 556.548 296.375 557.9977 C 296.375 559.4475 300.572 560.6227 305.75 560.6227 C 310.928 560.6227 315.125 559.4475 315.125 557.9977 z M 315.125 563.2477 C 315.125 561.798 310.928 560.6227 305.75 560.6227 C 300.572 560.6227 296.375 561.798 296.375 563.2477 C 296.375 564.6975 300.572 565.8727 305.75 565.8727 C 310.928 565.8727 315.125 564.6975 315.125 563.2477 z M 315.125 568.4977 C 315.125 567.048 310.928 565.8727 305.75 565.8727 C 300.572 565.8727 296.375 567.048 296.375 568.4977 C 296.375 569.9475 300.572 571.1227 305.75 571.1227 C 310.928 571.1227 315.125 569.9475 315.125 568.4977 z"
        fill="none"
        stroke="#0A5B5B"
        strokeWidth="1"
      />

      {/* Fixed circles at endpoints - all at the same height */}
      <circle cx="10" cy="41.8" r="6" fill="#0A5B5B" />
      <circle cx="95.3125" cy="41.8" r="6" fill="#0A5B5B" />
      <circle cx="305" cy="50" r="6" fill="#0A5B5B" />
      <circle cx="514.6875" cy="41.8" r="6" fill="#0A5B5B" />
      <circle cx="600" cy="41.8" r="6" fill="#0A5B5B" />
      <circle cx="305" cy="650" r="6" fill="#0A5B5B" />

      {/* Animated circles - keeping original animation pattern */}
      {/* First set of animations (0s) */}
      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.2s" dur="3s" repeatCount="indefinite">
          <mpath href="#left-outer" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.7s" dur="3s" repeatCount="indefinite">
          <mpath href="#right-inner" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.4s" dur="3s" repeatCount="indefinite">
          <mpath href="#center" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.5s" dur="3s" repeatCount="indefinite">
          <mpath href="#left-inner" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.5s" dur="3s" repeatCount="indefinite">
          <mpath href="#right-outer" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="1.3s" dur="3s" repeatCount="indefinite">
          <mpath href="#left-inner" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.9s" dur="3s" repeatCount="indefinite">
          <mpath href="#center" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.6s" dur="3s" repeatCount="indefinite">
          <mpath href="#right-outer" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="1.1s" dur="3s" repeatCount="indefinite">
          <mpath href="#left-outer" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#0A5B5B">
        <animateMotion begin="0.8s" dur="3s" repeatCount="indefinite">
          <mpath href="#right-inner" />
        </animateMotion>
      </circle>
    </svg>
  );
};

export default AnimatedTree;
