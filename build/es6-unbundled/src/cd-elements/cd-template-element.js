import{PolymerElement,html}from"../../node_modules/@polymer/polymer/polymer-element.js";import"../redux/redux-mixin.js";class CdTemplateElement extends PolymerElement{static get properties(){return{}}constructor(){super()}ready(){super.ready()}static get template(){return html`
      <style>
        :host {
          display: block;
        }
      </style>
      
    `}}customElements.define("cd-template-element",CdTemplateElement);