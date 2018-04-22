import{PolymerElement,html}from"../../node_modules/@polymer/polymer/polymer-element.js";import"./cd-tablet-graphic.js";class CdTabletLayout extends PolymerElement{static get properties(){return{tablet:Object,noWidthView:Boolean}}static get template(){return html`
      <style>
        /*Schematic Styles*/
        :host {
          display: flex;
          width: calc(100% - 32px - 10px);
          align-items: center;
          justify-content: space-around;
          border-radius: 16px;
          background-color: var(--background-color);
          border: 5px solid var(--border-color);
          padding: 8px 16px 16px 16px;
        }
        .graphic-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        tablet-graphic {
          width: 175px;
          height: 175px;
        }
        .schematic-label {
          @apply --paper-font-subhead;
          text-align: center;
        }
        
        [hidden] {
          display: none;
        }  
      </style>
      
      <div class='graphic-layout'>
        <cd-tablet-graphic top-view tablet='[[tablet]]'></cd-tablet-graphic>
        <div class='schematic-label'>Top View</div>
      </div>
      
      <div class='graphic-layout'>
        <cd-tablet-graphic length-view tablet='[[tablet]]'></cd-tablet-graphic>
        <div class='schematic-label'>Length View</div>
      </div>
      
      <div class='graphic-layout' hidden$='[[tablet.isRound]]'>
        <cd-tablet-graphic width-view tablet='[[tablet]]'></cd-tablet-graphic>
        <div class='schematic-label'>Width View</div>
      </div>        
    `}}customElements.define("cd-tablet-layout",CdTabletLayout);