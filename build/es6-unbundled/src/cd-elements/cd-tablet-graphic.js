import{PolymerElement,html}from"../../node_modules/@polymer/polymer/polymer-element.js";import"../../node_modules/@polymer/polymer/lib/elements/dom-if.js";import{ReduxMixin}from"../redux/redux-mixin.js";class CdTabletGraphic extends ReduxMixin(PolymerElement){static get properties(){return{topView:Boolean,lengthView:Boolean,widthView:Boolean,tablet:{type:Object,statePath:"tablet"},tabletSVG:{type:Object,notify:!0,value:function(){return{padding:1.5,cap:2,width:24,maxLength:.02,get scale(){return(this.width-2*this.padding)/this.maxLength},get center(){return this.width/2}}}},pathLengthSideTablet:{type:String,notify:!0,computed:"computePathSideTablet(tablet.shape, tablet.length, tablet.lengthCupRadius, tablet.bandThickness)"},pathLengthTopCup:{type:String,computed:"computePathTopCup(tablet.shape, tablet.length, tablet.lengthCupRadius, tablet.bandThickness)"},pathLengthBottomCup:{type:String,computed:"computePathBottomCup(tablet.shape, tablet.length, tablet.lengthCupRadius, tablet.bandThickness)"},pathLengthBand:{type:String,computed:"computePathBand(tablet.shape, tablet.length, tablet.bandThickness)"},pathWidthSideTablet:{type:String,computed:"computePathSideTablet(tablet.shape, tablet.width, tablet.widthCupRadius, tablet.bandThickness)"},pathWidthTopCup:{type:String,computed:"computePathTopCup(tablet.shape, tablet.width, tablet.widthCupRadius, tablet.bandThickness)"},pathWidthBottomCup:{type:String,computed:"computePathBottomCup(tablet.shape, tablet.width, tablet.widthCupRadius, tablet.bandThickness)"},pathWidthBand:{type:String,computed:"computePathBand(tablet.shape, tablet.width, tablet.bandThickness)"},pathTopTablet:{type:String,computed:"computePathTopTablet(tablet.shape, tablet.width, tablet.length)"}}}computePathSideTablet(a,b,c,d){let e=this.tabletSVG,f=b*e.scale,g=d*e.scale,h=c*e.scale;return"m "+e.center+" "+e.center+" m "+-f/2+" "+-g/2+" a "+h+" "+h+" 0 0 1 "+f+" 0 l 0 "+g+" a "+h+" "+h+" 0 0 1 "+-f+" 0 l 0 "+-g+" l "+f+" 0 m 0 "+g+" l "+-f+" 0"}computePathTopCup(a,b,c,d){let e=this.tabletSVG,f=b*e.scale,g=d*e.scale,h=c*e.scale;return"m "+e.center+" "+e.center+" m "+-f/2+" "+-g/2+" a "+h+" "+h+" 0 0 1 "+f+" 0 l "+-f+" 0 z"}computePathBottomCup(a,b,c,d){let e=this.tabletSVG,f=b*e.scale,g=d*e.scale,h=c*e.scale;return"m "+e.center+" "+e.center+" m "+f/2+" "+g/2+" a "+h+" "+h+" 0 0 1 "+-f+" 0 l "+f+" 0 z"}computePathBand(a,b,c){let d=this.tabletSVG,e=b*d.scale,f=c*d.scale;return"m "+d.center+" "+d.center+" m "+e/2+" "+-f/2+" l 0 "+f+" l "+-e+" 0 l 0 "+-f+" l "+e+" 0 z"}computePathTopTablet(a,b,c){let d,e=this.tabletSVG;switch(a){case"round":let f=c/2*e.scale;d="m "+e.center+" "+e.center+" m "+f+" 0 a "+f+" "+f+" 0 0 0 "+2*-f+" 0 a "+f+" "+f+" 0 0 0 "+2*f+" 0 z";break;case"oval":let g=c/2*e.scale,h=b/2*e.scale;d="m "+e.center+" "+e.center+" m "+g+" 0 a "+g+" "+h+" 0 0 0 "+2*-g+" 0 a "+g+" "+h+" 0 0 0 "+2*g+" 0 z";break;case"caplet":let i=b*e.scale,j=(c-b)*e.scale;d="m "+e.center+" "+e.center+" m "+j/2+" "+i/2+" l "+-j+" 0 a "+i/2+" "+i/2+" 0 0 1 0 "+-i+" l "+j+" 0 a "+i/2+" "+i/2+" 0 0 1 0 "+i+" z";}return d}computePathLengthLine(a,b,c){"round"===a&&(c=b);let d=this.tabletSVG,e=b*d.scale,f=c*d.scale;return"M "+(d.center-e/2)+" "+(d.center+f/2+d.padding)+" l 0 "+d.cap+" m 0 "+-d.cap/2+" l "+e+" 0 m 0 "+-d.cap/2+" l 0 "+d.cap}computePathWidthLine(a,b){let c=this.tabletSVG,d=a*c.scale,e=b*c.scale;return"M "+(c.center+d/2+c.padding)+" "+(c.center-e/2)+" l "+c.cap+" 0 m "+-c.cap/2+" 0 l 0 "+e+" m "+c.cap/2+" 0 l "+-c.cap+" 0"}computePathThicknessLine(a,b){let c=this.tabletSVG;var d=b*c.scale,e=a*c.scale;return"M "+(c.center+d/2+c.padding)+" "+(c.center-e/2)+" l "+c.cap+" 0 m "+-c.cap/2+" 0 l 0 "+e+" m "+c.cap/2+" 0 l "+-c.cap+" 0"}computePathCupThicknessLine(a,b,c){let d=this.tabletSVG;var e=c*d.scale,f=b*d.scale,g=a*d.scale;return"M "+(d.center+e/2+d.padding)+" "+(d.center-f/2)+" l "+d.cap+" 0 m "+-d.cap/2+" 0 l 0 "+g+" m "+d.cap/2+" 0 l "+-d.cap+" 0"}static get template(){return html`
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
    `}}customElements.define("cd-tablet-graphic",CdTabletGraphic);