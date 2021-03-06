
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import { Pan } from '../../classes/pan.js';

class PanGraphic extends PolymerElement {
    
    static get properties() {
        return {
          pan: Object,
          _pan: Object,
          batch: Object,
          frontView: Boolean,
          sideView: Boolean,
          volumeType: { type: String, value: 'brim' },
          svg: {
            type: Object,
            value: function() {
              return {
    
                // padding around the edge of svg
                padding: 1.5,
                
                // the end cap of the dimension line
                cap: 2,
    
                //target width of svg
                width: 24,
    
                maxLength: 1.75,
    
                // center starting point
                get center() {
                    return this.width / 2;
                },
    
                // scale: 2100
                // the value to multiple other dimensions by to scale
                get scale() {
                    return (this.width - (2 * this.padding)) / this.maxLength;
                }
              };
            }
          },
        };
      }
    static get observers() {
        return [
            "_setPan(pan.*)"
        ];
    }
    
    _setPan(changeRecord) {
        if(!changeRecord.base) { return; }
        this._pan = new Pan(changeRecord.base);
    }

      // Path for SVG Graphics
      _getSidePan(diameter, open, wall, brim) {
        let svg = this.svg;
        //helper values
        let scaledDiameter = diameter * svg.scale;
        let scaledOpen = open * svg.scale;
        let scaledWall = wall * svg.scale;
        let scaledDepth = brim * svg.scale;
        
        //distance from brim to starting wall. Only one side This gives us the slope of the pan walls
        let wallX = (scaledDepth - scaledWall) / 2;
        //the difference in height from the brim to diameter only on one side
        let wallY = (scaledDiameter - scaledOpen) / 2;
        
        return "M " + svg.center + " " + svg.center + 
                " m " + (scaledDepth / 2) + " " + (scaledOpen / 2) +
                " l " + -wallX + " " + wallY + 
                " l " + -scaledWall + " 0" +
                " l " + -wallX + " " + -wallY +
                " l 0 " + -scaledOpen +
                " l " + wallX + " " + -wallY +
                " l " + scaledWall + " 0" + 
                " l " + wallX + " " + wallY +
                " l 0 " + scaledOpen + " z";
      }
      _getFrontPan(diameter) {
          let svg = this.svg;
          //helper values
          let scaledDiameter = diameter * svg.scale;
          let rad = scaledDiameter / 2;
      
          return  "M " + svg.center + " " + svg.center +
                  " m " + -rad + " 0" +
                  " a " + rad + " " + rad + " 0 0 0 " + scaledDiameter + " 0" +
                  " a " + rad + " " + rad + " 0 0 0 " + -scaledDiameter + " 0 z";
      } 
      _getFrontFill(diameter, volume){
        let svg = this.svg;
        let fill = 0;
        switch(this.volumeType) {
          case 'min':
            fill = this._pan.minFillHeight;
            break;
          case 'max':
            fill = this._pan.maxFillHeight;
            break;
          case 'brim':
            fill = this._pan.brimHeight;
            break;
          case 'batch':
            fill = this.batch.batchFillHeight;
            break;
        }
        
        //helper values
        let scaledFill = fill * svg.scale;
        let scaledDiameter = diameter * svg.scale;
        let scaledRadius = scaledDiameter / 2;
        
        
        //we stopp the graphic if fill height is bigger than pan radius
        if(scaledFill > scaledRadius){
          scaledFill = scaledRadius;
        }
        
        //the difference of the pan radius and fill height
        let gapHeight = scaledRadius - scaledFill;
        //right triangle from radius and gap height gives x coordinate for starting arc fill
        let fillHalfChord = Math.sqrt(Math.pow(scaledRadius, 2) - Math.pow(gapHeight, 2));
        
        return  "M " + (svg.center - fillHalfChord) + " " + (svg.center + gapHeight) +
                      " a " + scaledRadius + " " + scaledRadius + " 0 0 0 " + (2 * fillHalfChord) + " 0 z";
      }
      _getSideFill(diameter, open, wall, brim, volume) {
        let svg = this.svg;
        let fill = 0;
        switch(this.volumeType) {
          case 'min':
            fill = this._pan.minFillHeight;
            break;
          case 'max':
            fill = this._pan.maxFillHeight;
            break;
          case 'brim':
            fill = this._pan.brimHeight;
            break;
          case 'batch':
            fill = this.batch.batchFillHeight;
            break;
        }
        //helper values
        let scaledDiameter = diameter * svg.scale;
        let scaledOpen = open * svg.scale;
        let scaledWall = wall * svg.scale;
        let scaledDepth = brim * svg.scale;
        let scaledFill = fill * svg.scale;
        let brimToFill = (scaledDiameter - scaledOpen) / 2 - scaledFill;
        
        //distance from brim to starting wall. Only one side This gives us the slope of the pan walls
        let wallX = (scaledDepth - scaledWall) / 2;
        //the difference in height from the brim to diameter only on one side
        let wallY = (scaledDiameter - scaledOpen) / 2;
        
        let slope = wallY / wallX;
        
        let fillX = brimToFill / slope;
        
        return "M " + svg.center + " " + svg.center + 
                " m " + (scaledDepth / 2) + " " + (scaledOpen / 2) +
                " m " + (-fillX) + " " + (brimToFill) + 
                " l " + (-wallX + fillX) + " " + (wallY - brimToFill) + 
                " l " + -scaledWall + " 0" +
                " l " + (-wallX + fillX) + " " + (-wallY + brimToFill) + " z";
      }
      
      static get template() {
          return html`
          
          <style>
              :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                --pan-size: calc(100% - 16px);
                --pan-color: #F2F2F2;
                --pan-outline-color: var(--text-light-color);
                --pan-fill-color: var(--app-light-color, #FF514B);
                
              }
              svg {
                height: var(--pan-size);
                width: var(--pan-size);
                fill: var(--pan-color);
                stroke: var(--pan-outline-color);
                fill-opacity: 1;
                stroke-width: 0.35px;
                stroke-linejoin: bevel;
              }
              .volume {
                fill: var(--pan-fill-color);
                fill-opacity: 1;
              }
            </style>
            
            
            <template is='dom-if' if='[[frontView]]'>
              <svg viewbox='0 0 24 24'>
              <path class='outline' d$='[[_getFrontPan(_pan.panDiameter)]]'></path>
              <path class='outline' d$='[[_getFrontPan(_pan.openingDiameter)]]'></path>
              <path class='volume' d$='[[_getFrontFill(_pan.panDiameter, batch.batchVolume)]]'></path>
              </svg>
            </template>
            
            <template is='dom-if' if='[[sideView]]'>
              <svg viewbox='0 0 24 24'>
                <path class='outline' d$='[[_getSidePan(_pan.panDiameter, _pan.openingDiameter, _pan.wallWidth, _pan.brimWidth)]]'></path>
                <path class='volume' d$='[[_getSideFill(_pan.panDiameter, _pan.openingDiameter, _pan.wallWidth, pan.brimWidth, batch.batchVolume)]]'></path>
              </svg>
            </template>
          `;
          
      }
}


customElements.define('pan-graphic', PanGraphic);