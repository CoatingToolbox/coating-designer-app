
import { CdUnitInput } from './cd-unit-input.js';

class CdMassInput extends CdUnitInput {
  
  ready() {
    super.ready();
    this._units = 
      [
        {unit: "mg", text: 'mg', multiplier: 0.001 },
        {unit: "g", text: 'g', multiplier: 1 },
        {unit: "kg", text: 'kg', multiplier: 1000 },
        {unit: "oz", text: 'oz', multiplier: 28.3495 },
        {unit: "lb", text: 'lb', multiplier: 453.592 },
      ];
    this.unit = 'mg';
    this._multiplier = 0.001;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-mass-input', CdMassInput);