import{PolymerElement,html}from"../../node_modules/@polymer/polymer/polymer-element.js";class CdCardButton extends PolymerElement{static get properties(){return{label:String}}static get template(){return html`
      <style>
        :host {
          display: block;
          padding: 8px 24px;
          border-radius: 6px;
          background-color: var(--app-accent-color);
          color: var(--white-color);
        }
        :host(:hover) {
          cursor: pointer;
        }
        #label {
          font-weight:  light;
          font-size: 14px;
        }
      </style>
      
      <div id='label'>[[label]]</div>
    `}}customElements.define("cd-card-button",CdCardButton);