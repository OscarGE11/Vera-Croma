import { Component } from '@angular/core';
import { ColorGenerationService } from '../../services/color-generation.service';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [ClipboardModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),

      transition('void => *', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 })),
      ]),

      transition('* => void', [
        style({ opacity: 1 }),
        animate('250ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  constructor(
    private colorGenerationService: ColorGenerationService,
    private clipboard: Clipboard
  ) {}

  firstColor: string = '';
  secondColor: string = '';
  thirdColor: string = '';
  showCopyInfo: boolean = false;
  coppiedColor: string = '';
  hideTimer: any;
  showDisclaimer: boolean = true;

  ngOnDestroy(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }

  ngOnInit(): void {
    this.generateColors();
  }

  generateColors(): void {
    this.firstColor = this.colorGenerationService.generateColor();
    this.secondColor = this.colorGenerationService.generateColor();

    if (this.firstColor === this.secondColor) {
      this.secondColor = this.colorGenerationService.generateColor();
    }

    this.thirdColor = this.colorGenerationService.generateColor();

    if (
      this.firstColor === this.thirdColor ||
      this.secondColor === this.thirdColor
    ) {
      this.thirdColor = this.colorGenerationService.generateColor();
    }
  }

  copyColor(color: string): void {
    this.clipboard.copy(color);
    this.coppiedColor = color.toUpperCase();
    this.showCopyInfo = true;
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    this.hideTimer = setTimeout(() => {
      this.showCopyInfo = false;
    }, 1500);
  }
}
