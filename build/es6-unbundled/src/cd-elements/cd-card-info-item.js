import{PolymerElement,html}from"../../node_modules/@polymer/polymer/polymer-element.js";class CdCardInfoItem extends PolymerElement{static get properties(){return{label:String}}static get template(){return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          padding-bottom: 10px;
          font-size: 14px;
        }
        #label {
          font-weight: bold;
          margin-right: 8px;
        }
      </style>
      
      <div id='label'>[[label]]:</div>
      <slot></slot>
    `}}customElements.define("cd-card-info-item",CdCardInfoItem);