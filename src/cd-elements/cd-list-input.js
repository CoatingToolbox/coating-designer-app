
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

class CdListInput extends PolymerElement {
  static get properties () {
    return {
      label: String,
      values: Array,
      selectedValue: {type: String, notify: true }
    };
  }

  _valueSelected(e) {
    this.selectedValue = e.target.value;
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto 1fr;
        }
        #label {
          grid-row: 1 / 2;
          grid-column: 1 / 3;
          color: var(--text-light-color);
          font-size: 14px;
          margin-bottom: 4px
        }
        select {
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
          text-align: start;
          text-overflow: ellipsis;
        }
        select:hover {
          cursor: pointer;
        }
        #arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          background-color: var(--white-color);
          color: #828282;
          width: 41.5px;
          height: 41.5px;
          border: 1px solid #828282;
          border-radius: 4px 4px 0px 0px;
          transform: rotate(90deg);
          cursor: pointer;
        }
        
      </style>
      
      <div id='label'>[[label]]</div>
      
      <select on-change='_valueSelected'>
        <dom-repeat items='[[values]]'>
          <template is='dom-repeat' items='[[values]]'>
            <option value='[[item]]'>[[item]]</option>
          </template>
        </dom-repeat>
      </select>
      
      <div id='arrow'>></div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-list-input', CdListInput);