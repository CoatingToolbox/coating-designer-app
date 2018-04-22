
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../../node_modules/@polymer/iron-dropdown/iron-dropdown.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';

class CdUnitInput extends PolymerElement {
  static get properties () {
    return {
      value: { type: Number, notify: true },
      unit: { type: String, notify: true },
      label: String,
      _units: Array,
      _multiplier: { type: Number, value: 1 }
    };
  }
  
  static get observers() {
    return [
      '_setInputValue(_multiplier, value)'
    ];
  }

  _setInputValue(multiplier, value) {
    this.$.input.value = (value / multiplier).toFixed(2);
  }
  
  _unitSelected(e) {
    this.unit = e.model.item.unit;
    this._multiplier = e.model.item.multiplier;
    this._toggleDropdown();
  }
  
  _toggleDropdown() {
    this.$.dropdown.toggle();
  }
  _userInputValue(e) {
    this.value = parseFloat(e.target.value) * this._multiplier;
  }
  
  static get template () {
    return html`
      <style>
        :host {
          display: grid;
          grid-template-rows: auto 1fr;
          grid-template-columns: 1fr auto;
        }
        
        #label {
          grid-row: 1 / 2;
          grid-column: 1 / 3;
          color: var(--text-light-color);
          font-size: 14px;
          margin-bottom: 4px
        }
        
        #input, 
        #input:focus {
          grid-row: 2 / 3;
          grid-column: 1 / 2;
          background-color: var(--white-color);
          padding: 12px 16px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 4px 0px 0px 4px;
          border: 1px solid #828282;
          border-right: none;
          outline: none;
          text-align: start;
          text-overflow: ellipsis;
        }
        #input[type=number]::-webkit-inner-spin-button,
        #input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            margin: 0;
        }
        #input:focus {
          color: var(--app-primary-color);
        }
        #input:hover {
          cursor: text;
        }
        
        #unit-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          min-width: 32px;
          padding: 8px 16px;
          background-color: var(--white-color);
          font-size: 14px;
          color: #828282;
          border: 1px solid #828282;
          border-radius: 0px 4px 4px 0px;
        }
        #arrow {
          display: flex;
          padding-bottom: 8px;
          transform: rotate(90deg);
          cursor: pointer;
        }
        
        #dropdown {
          background-color: var(--white-color);
          font-size: 16px;
          color: var(--text-light-color);
          padding: 16px 24px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        #dropdown .item {
          padding: 8px;
        }
        #dropdown .item.iron-selected {
          color: var(--accent-color);
          font-weight: bold;
        }
      </style>
      
      <div id='label'>[[label]]</div>
      <input id='input' type="number" step='0.01' min='0' on-change='_userInputValue' size='1'>
      <div id='unit-layout' on-click='_toggleDropdown'>
        <div>[[unit]]</div>
        <div id='arrow'>></div>
      </div>
        
          
      <iron-dropdown id='dropdown' horizontal-align="right" vertical-align="bottom">
        <iron-selector slot='dropdown-content' selected='[[unit]]' attr-for-selected='unit'>
          <template is='dom-repeat' items='[[_units]]'>
              <div class='item' on-tap='_unitSelected' unit='[[item.unit]]'>[[item.text]]</div>
          </template>  
        </iron-selector>
      </iron-dropdown>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
// customElements.define('cd-unit-input', CdUnitInput);

export { CdUnitInput }
