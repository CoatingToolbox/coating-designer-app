import{PolymerElement,html}from"../node_modules/@polymer/polymer/polymer-element.js";import"../node_modules/@polymer/app-route/app-location.js";import"../node_modules/@polymer/app-route/app-route.js";import"../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js";import"../node_modules/@polymer/app-layout/app-header/app-header.js";import"../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js";import"../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js";import"../node_modules/@polymer/iron-pages/iron-pages.js";import"./pages/cd-home-page.js";import"./pages/cd-tablet-page.js";class CdAppShell extends PolymerElement{static get properties(){return{route:Object,routeData:Object,page:String}}static get observers(){return["_routePageChanged(routeData.page)","_pageChanged(page)"]}_routePageChanged(a){this.page=a||"home"}_pageChanged(){}static get ready(){super.ready()}static get template(){return html`
      <style>
        :host {
          display: block;
        }
        app-header {
          background-color: var(--app-dark-color);
          color: var(--white-color);
        }
        #toolbar-title {
          font-size: 24px;
        }
        #toolbar-spacer {
          flex-grow: 1;
        }
        #user-name {
          font-size: 16px;
        }
        .icon {
          width: 24px;
          height: 24px;
          margin: 8px;
          border-radius: 50%;
          background-color: var(--light-gray-color);
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
      
      <app-header-layout fullbleed>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <div class='icon'></div>
            <div id='toolbar-title'>Coating Designer</div>
            <div id='toolbar-spacer'></div>
            <div class='icon'></div>
            <div id='user-name'>jhansell@colorcon.com</div>
          </app-toolbar>
        </app-header>
        
        <iron-pages selected='[[page]]' attr-for-selected='page' fallback-selection='home'>
          <cd-home-page page='home'></cd-home-page>
          <cd-tablet-page page='tablet'></cd-tablet-page>
          <div page='two'>Two</div>
          <div page='three'>Three</div>
        </iron-pages>
        
      </app-header-layout>
    `}}customElements.define("cd-app-shell",CdAppShell);