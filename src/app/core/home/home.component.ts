import { Component } from '@angular/core';
import { ColorGenerationService } from '../../services/color-generation.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private colorGenerationService: ColorGenerationService) {}

  firstColor: string = '';
  secondColor: string = '';
  thirdColor: string = '';

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
}
