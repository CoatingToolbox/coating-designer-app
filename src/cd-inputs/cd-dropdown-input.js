
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../../node_modules/@polymer/iron-dropdown/iron-dropdown.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../cd-elements/cd-icons.js';

class CdDropdownInput extends PolymerElement {
  static get properties () {
    return {
      label: String,
      options: Array,
      selected: {type: String, notify: true }
    };
  }
  
  _toggleDropdown() {
    this.$.dropdown.toggle();
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
        #value {
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
          cursor: pointer;
          font-size: 16px;
          color: var(--text-color);
          line-height: 24px;
        }
        #icon-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          width: 50px;
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          background-color: var(--white-color);
          color: #828282;
          border: 1px solid #828282;
          border-radius: 0px 4px 4px 0px;
          cursor: pointer;
        }
        
        #dropdown {
          background-color: var(--white-color);
          font-size: 16px;
          color: var(--text-light-color);
          padding: 16px 8px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        #dropdown .item {
          padding: 8px 16px;
        }
        #dropdown .item + .item {
          margin-top: 4px;
        }
        #dropdown .item:hover {
          cursor: pointer;
          background-color: var(--background-color);
        }
        #dropdown .item.iron-selected {
          color: var(--accent-color);
          font-weight: bold;
        }
        
      </style>
      
      <div id='label'>[[label]]</div>
      
      <div id='value' on-click='_toggleDropdown' >[[selected]]</div>
      
      <div id='icon-layout'>
        <iron-icon id='icon' on-click='_toggleDropdown' icon='cd-icons:chevron-down'></iron-icon>
      </div>
      
      <iron-dropdown id='dropdown' horizontal-align="right" vertical-align="bottom">
        <iron-selector slot='dropdown-content' selected='{{selected}}' attr-for-selected='option'>
          <template is='dom-repeat' items='[[options]]'>
              <div class='item' option='[[item]]' on-click='_toggleDropdown'>[[item]]</div>
          </template>  
        </iron-selector>
      </iron-dropdown>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-dropdown-input', CdDropdownInput);