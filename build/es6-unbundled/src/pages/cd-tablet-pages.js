import{PolymerElement,html}from"../../node_modules/@polymer/polymer/polymer-element.js";import"../../node_modules/@polymer/app-route/app-location.js";import"../../node_modules/@polymer/app-route/app-route.js";import"../../node_modules/@polymer/paper-tabs/paper-tabs.js";import"../../node_modules/@polymer/paper-tabs/paper-tab.js";import"../../node_modules/@polymer/iron-pages/iron-pages.js";import"../cd-elements/cd-card-with-toolbar.js";import"../cd-elements/cd-card-button.js";import"./cd-tablet-overview-page.js";import"./cd-tablet-design-page.js";class CdTabletPages extends PolymerElement{static get properties(){return{route:Object,routeData:Object}}static get template(){return html`
      <style>
        :host {
          display: block;
          min-height: 100vh;
          padding-bottom: 48px;
        }
        #header {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        #title-layout {
          display: flex;
          align-items: center;
          padding: 16px 24px;
        }
        #header #title-icon {
          height: 48px;
          width: 48px;
          margin-right: 24px;
          background-color: var(--app-light-color);
          border: 2px solid var(--light-gray-color);
          border-radius: 8px;
        }
        #header #header-title {
          font-size: 48px;
          font-weight: lighter;
        }
        paper-tabs {
          --paper-tabs-selection-bar-color: var(--app-accent-color);
          font-size: 18px;
        }
        paper-tabs a {
          text-decoration: none;
          color: inherit;
          height: initial;
          text-align: center;
        }
      </style>
      
      <app-location
        route="{{route}}"
        use-hash-as-path>
      </app-location>
  
      <app-route
        route="{{route}}"
        pattern="/tablet/:tab"
        data="{{routeData}}">
      </app-route>
      
      <section id='header'>
        <div id='title-layout'>
          <div id='title-icon'></div>
          <div id='header-title'>Coating Substrate</div>
        </div>
        <paper-tabs selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
          <paper-tab tab='overview' link>
            <a href="#/tablet/overview" tabindex="-1">Overview</a>
          </paper-tab>
          <paper-tab tab='design' link>
            <a href="#/tablet/design" tabindex="-1">Design</a>
          </paper-tab>
          <paper-tab tab='library' link>
            <a href="#/tablet/library" tabindex="-1">Library</a>
          </paper-tab>
        </paper-tabs>
      </section>
      
      <iron-pages selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
        <cd-tablet-overview-page tab='overview'></cd-tablet-overview-page>
        <cd-tablet-design-page tab='design'>Design</cd-tablet-design-page>
        <div tab='library'>Library</div>
      </iron-pages>
      
    `}}customElements.define("cd-tablet-pages",CdTabletPages);