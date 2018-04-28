import{PolymerElement,html}from"../node_modules/@polymer/polymer/polymer-element.js";import"../node_modules/@polymer/app-route/app-location.js";import"../node_modules/@polymer/app-route/app-route.js";import"../node_modules/@polymer/iron-pages/iron-pages.js";import"./pages/cd-home-page.js";import"./pages/cd-tablet-pages.js";class CdAppShell extends PolymerElement{static get properties(){return{route:Object,routeData:Object,page:String}}static get observers(){return["_routePageChanged(routeData.page)"]}_routePageChanged(a){window.scrollTo(0,0),this.page=a||"home"}static get template(){return html`
      <style>
        :host {
          display: block;
        }
      </style>
      
      <app-location
          route="{{route}}"
          use-hash-as-path>
      </app-location>
  
      <app-route
          route="{{route}}"
          pattern="/:page"
          data="{{routeData}}">
      </app-route>
      
        
      <iron-pages selected='[[page]]' attr-for-selected='page' fallback-selection='home'>
        <cd-home-page page='home'></cd-home-page>
        <cd-tablet-pages page='tablet'></cd-tablet-pages>
      </iron-pages>
        
    `}}customElements.define("cd-app-shell",CdAppShell);