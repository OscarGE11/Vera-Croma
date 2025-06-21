import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorGenerationService {
  constructor() {}

  generateColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
