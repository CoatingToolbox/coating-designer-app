
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import { Tablet } from '../../classes/tablet.js';

class TabletGraphic extends PolymerElement {
  static get properties () {
    return {
      topView: Boolean,
      lengthView: Boolean,
      widthView: Boolean,
      tablet: Object,
      _tablet: Object,
      tabletSVG: {
        type: Object,
        notify: true,
        value: function() {
          return {
            // padding around the edge of svg
            padding: 1.5,
            
            // the end cap of the dimension line
            cap: 2,
  
            //target width of svg
            width: 24,
  
            //max length of tablet
            //we use 0.02 meters = 20 mm;
            maxLength: 0.02,
  
            // scale: 1050,
            // the value to multiple other dimensions by to scale
            get scale() {
                return (this.width - (2 * this.padding)) / this.maxLength;
            }, 
            
            // center starting point
            get center() {
                return this.width / 2;
            },
          };
        }
      },
      pathLengthSideTablet: {
        type: String,
        notify: true,
        computed: "computePathSideTablet(_tablet.shape, _tablet.length, _tablet.lengthCupRadius, _tablet.bandThickness)"
      },
      pathLengthTopCup: {
        type: String,
        computed: 'computePathTopCup(_tablet.shape, _tablet.length, _tablet.lengthCupRadius, _tablet.bandThickness)'
      },
      pathLengthBottomCup: {
        type: String,
        computed: 'computePathBottomCup(_tablet.shape, _tablet.length, _tablet.lengthCupRadius, _tablet.bandThickness)'
      },
      pathLengthBand: {
        type: String,
        computed: 'computePathBand(_tablet.shape, _tablet.length, _tablet.bandThickness)'
      },
      pathWidthSideTablet: {
        type: String,
        computed: "computePathSideTablet(_tablet.shape, _tablet.width, _tablet.widthCupRadius, _tablet.bandThickness)"
      },
      pathWidthTopCup: {
        type: String,
        computed: 'computePathTopCup(_tablet.shape, _tablet.width, _tablet.widthCupRadius, _tablet.bandThickness)'
      },
      pathWidthBottomCup: {
        type: String,
        computed: 'computePathBottomCup(_tablet.shape, _tablet.width, _tablet.widthCupRadius, _tablet.bandThickness)'
      },
      pathWidthBand: {
        type: String,
        computed: 'computePathBand(_tablet.shape, _tablet.width, _tablet.bandThickness)'
      },
      pathTopTablet: {
        type: String,
        computed: 'computePathTopTablet(_tablet.shape, _tablet.width, _tablet.length)'
      }
    };
  }

  static get observers() {
    return [
      "_setTablet(tablet.*)"
    ];
  }
  _setTablet(changeRecord) {
    if(!changeRecord.base) { return }
    this._tablet =  new Tablet(changeRecord.base);
  }
  
  // SVG Path function
  computePathSideTablet(shape, length, cupRadius, bandThickness) {
    //scale is used to shrink or grow the value as needed
    //to draw the tablet we use radius so we scale it and divide by 2
    let svg = this.tabletSVG;
    let scaledLength = length * svg.scale;
    let scaledBand = bandThickness * svg.scale;
    let scaledCup = cupRadius * svg.scale;
    
    // TOP ARC
    return "m " + svg.center + " " + (svg.center) +
            " m " + (-scaledLength / 2) + " " + (-scaledBand / 2) +
            " a " + scaledCup + " " + scaledCup + " 0 0 1 " + scaledLength + " 0" +
            " l 0 " + scaledBand +
            " a " + scaledCup + " " + scaledCup + " 0 0 1 " + -scaledLength + " 0" +
            " l 0 " + -scaledBand +
            " l " + scaledLength + " 0" +
            " m 0 " + scaledBand +
            " l " + -scaledLength + " 0";     
  }
  computePathTopCup(shape, length, cupRadius, bandThickness) {
      //scale is used to shrink or grow the value as needed
      //to draw the tablet we use radius so we scale it and divide by 2
    let svg = this.tabletSVG;
      let scaledLength = length * svg.scale;
      let scaledBand = bandThickness * svg.scale;
      let scaledCup = cupRadius * svg.scale;
      
      // TOP ARC
     return "m " + svg.center + " " + (svg.center) +
            " m " + (-scaledLength / 2) + " " + (-scaledBand / 2) +
            " a " + scaledCup + " " + scaledCup + " 0 0 1 " + scaledLength + " 0" +
            " l " + -scaledLength + " 0 z";  
  }
  computePathBottomCup(shape, length, cupRadius, bandThickness) {
      //Path is designed to fit in a 50 by 50 pixel box
      //scale is used to shrink or grow the value as needed
      //to draw the tablet we use radius so we scale it and divide by 2
    let svg = this.tabletSVG;
      let scaledLength = length * svg.scale;
      let scaledBand = bandThickness * svg.scale;
      let scaledCup = cupRadius * svg.scale;
      
      // TOP ARC
      return "m " + svg.center + " " + (svg.center) +
              " m " + (scaledLength / 2) + " " + (scaledBand / 2) +
              " a " + scaledCup + " " + scaledCup + " 0 0 1 " + -scaledLength + " 0" +
              " l " + scaledLength + " 0 z";     
  }
  computePathBand(shape, length, bandThickness) {
      //Path is designed to fit in a 50 by 50 pixel box
      //scale is used to shrink or grow the value as needed
      //to draw the tablet we use radius so we scale it and divide by 2
    let svg = this.tabletSVG;
      let scaledLength = length * svg.scale;
      let scaledBand = bandThickness * svg.scale;
      
      // SIDE BAND
      return "m " + svg.center + " " + (svg.center) +
                  " m " + (scaledLength / 2) + " " + (-scaledBand / 2) +
                  " l 0 " + scaledBand +
                  " l " + -scaledLength + " 0" +
                  " l 0 " + -scaledBand +
                  " l " + scaledLength + " 0 z";
  }
  computePathTopTablet(shape, width, length) {
  
          let path;
    let svg = this.tabletSVG;
  
          switch (shape) {
  
              case 'round':
                  //Path is designed to fit in a 50 by 50 pixel box
                  //scale is used to shrink or grow the value as needed
                  //to draw the tablet we use radius so we scale it and divide by 2
                  let scaledRadius = length / 2 * svg.scale;
                  // TOP VIEW
                  path = "m " + svg.center + " " + (svg.center) +
                                  " m " + scaledRadius + " 0" +
                                  " a " + scaledRadius + " "  + scaledRadius + " 0 0 0 " + (-scaledRadius * 2) + " 0" +
                                  " a " + scaledRadius + " "  + scaledRadius + " 0 0 0 " + (scaledRadius * 2) + " 0 z";
                  break;
  
              case 'oval':
                  //Path is designed to fit in a 50 by 50 pixel box
                  //scale is used to shrink or grow the value as needed
                  //to draw the tablet we use radius so we scale it and divide by 2
                  let r1 = length / 2 * svg.scale;
                  let r2 = width / 2 * svg.scale;
                  // TOP VIEW
                  path = "m " + svg.center + " " + (svg.center) +
                          " m " + r1 + " 0" +
                          " a " + r1 + " " + r2 + " 0 0 0 " + (-r1 * 2) + " 0" +
                          " a " + r1 + " " + r2 + " 0 0 0 " + (r1 * 2) + " 0 z";
                  break;
  
              case 'caplet':
                  //Path is designed to fit in a 50 by 50 pixel box
                  //scale is used to shrink or grow the value as needed
                  let scaledWidth = width * svg.scale;
                  let scaledBody = (length - width) * svg.scale;
                                  
                  path = "m " + svg.center + " " + (svg.center) +
                          " m " + (scaledBody / 2) + " " + (scaledWidth / 2) +
                          " l " + -scaledBody + " 0" +
                          " a " + (scaledWidth / 2) + " " + (scaledWidth / 2) + " 0 0 1 0 " + -scaledWidth + 
                          " l " + scaledBody + " 0" +
                          " a " + (scaledWidth / 2) + " " + (scaledWidth / 2) + " 0 0 1 0 " + scaledWidth + " z";
                  break;
          }
  
          return path;
      }
  computePathLengthLine(shape, length, width) {
      if(shape === 'round') {
          width = length;
      }
    let svg = this.tabletSVG;
      let scaledLength = length * svg.scale;
      let scaledWidth = width * svg.scale;

      return "M " + (svg.center - scaledLength / 2) + " " + (svg.center + scaledWidth / 2 + svg.padding) +
              " l 0 " + svg.cap +
              " m 0 " + (-svg.cap / 2) +
              " l " + scaledLength + " 0" +
              " m 0 " + (-svg.cap / 2) +
              " l 0 " + svg.cap;
  }
  computePathWidthLine(length, width) {
  
    let svg = this.tabletSVG;
    let scaledLength = length * svg.scale;
    let scaledWidth = width * svg.scale;

    return "M " + (svg.center + scaledLength / 2 + svg.padding) + ' ' + (svg.center - scaledWidth / 2) +
            " l " + svg.cap + " 0" +
            " m " + (-svg.cap / 2) + " 0" +
            " l 0 " + scaledWidth +
            " m " + (svg.cap / 2) + " 0" +
            " l " + -svg.cap + " 0";
  }
  computePathThicknessLine(thickness, length) {
    //Path is designed to fit in a 50 by 50 pixel box
    //scale is used to shrink or grow the value as needed
    //to draw the tablet we use radius so we scale it and divide by 2
    let svg = this.tabletSVG;
    var scaledLength = length * svg.scale;
    var scaledThickness = thickness * svg.scale;
   
    return "M " + (svg.center + scaledLength / 2 + svg.padding) + ' ' + (svg.center - scaledThickness / 2) +
            " l " + svg.cap + " 0" +
            " m " + (-svg.cap / 2) + " 0" +
            " l 0 " + scaledThickness +
            " m " + (svg.cap / 2) + " 0" +
            " l " + -svg.cap + " 0";
  }
  computePathCupThicknessLine(cup, total, length) {
    //Path is designed to fit in a 50 by 50 pixel box
    //scale is used to shrink or grow the value as needed
    //to draw the tablet we use radius so we scale it and divide by 2
    let svg = this.tabletSVG;
    var scaledLength = length * svg.scale;
    var scaledTotal = total * svg.scale;
    var scaledCup = cup * svg.scale;
   
    return "M " + (svg.center + scaledLength / 2 + svg.padding) + ' ' + (svg.center - scaledTotal / 2) +
            " l " + svg.cap + " 0" +
            " m " + (-svg.cap / 2) + " 0" +
            " l 0 " + scaledCup +
            " m " + (svg.cap / 2) + " 0" +
            " l " + -svg.cap + " 0";
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          --tablet-size: calc(100% - 0px);
          --tablet-fill-color: var(--app-light-color);
          --tablet-outline-color: var(--app-primary-color);
        }
        
        .tablet-graphic {
          height: var(--tablet-size);
          width: var(--tablet-size);
          fill: var(--tablet-fill-color);
          fill-opacity: 0.8;
          stroke: var(--tablet-outline-color);
          stroke-width: 0.35px;
          stroke-linejoin: round;
        }
      </style>
      
      <template is='dom-if' if='[[topView]]'>
        <svg class='tablet-graphic' viewbox='0 0 24 24'>
          <path d$='[[pathTopTablet]]'></path>
        </svg>
      </template>
      
      <template is='dom-if' if='[[lengthView]]'>
        <svg class='tablet-graphic' viewbox='0 0 24 24'>
          <path d$='[[pathLengthSideTablet]]'></path>
        </svg>
      </template>
      
      <template is='dom-if' if='[[widthView]]'>
        <svg class='tablet-graphic' viewbox='0 0 24 24'>
          <path d$='[[pathWidthSideTablet]]'></path>
        </svg>
      </template>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-graphic', TabletGraphic);