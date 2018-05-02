
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/paper-tabs/paper-tabs.js';
import '../../node_modules/@polymer/paper-tabs/paper-tab.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../app-icons.js';
import '../pan/pan-overview-page.js';
import '../pan/pan-designer-page.js';
import '../pan/pan-library-page.js';

class PanPages extends PolymerElement {
  static get properties () {
    return {
      route: Object,
      routeData: Object
    };
  }
  
  _goHome() {
    window.location = '#/home';
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          --app-primary-color: #C85555;
          --app-dark-color: #C85555;
          --app-light-color: #E3AAAA;
          --app-accent-color: #00BCD4;
          
        }
        
        app-header {
          background-color: var(--white-color);
          color: var(--app-light-color);
        }
        app-header a {
          text-decoration: none;
          color: inherit;
        }
        app-header .icon {
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--app-dark-color);
          background-color: var(--app-light-color);
        }
        
        paper-tabs {
          --paper-tabs-selection-bar-color: var(--app-accent-color);
          font-size: 16px;
          color: var(--text-light-color);
        }
        paper-tab {
          padding: 0px 16px;
          margin: 0px 8px;
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
        pattern="/pan/:tab"
        data="{{routeData}}">
      </app-route>
      
      <app-header-layout fullbleed>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <paper-icon-button on-click='_goHome' icon='app-icons:home'></paper-icon-button>
            <page-title class='toolbar-title'>Coating Pan</page-title>
            <div id='toolbar-spacer'></div>
            <paper-tabs selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
              <paper-tab tab='overview' link>
                <a href="#/pan/overview" tabindex="-1">Overview</a>
              </paper-tab>
              <paper-tab tab='designer' link>
                <a href="#/pan/designer/description" tabindex="-1">Designer</a>
              </paper-tab>
              <paper-tab tab='library' link>
                <a href="#/pan/library" tabindex="-1">Library</a>
              </paper-tab>
            </paper-tabs>
            
          </app-toolbar>
        </app-header>
      
        <iron-pages selected='[[routeData.tab]]' attr-for-selected='tab' fallback-selection='overview'>
          <pan-overview-page tab='overview'></pan-overview-page>
          <pan-designer-page tab='designer'></pan-designer-page>
          <pan-library-page tab='library'></pan-library-page>
        </iron-pages>
      </app-header-layout>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-pages', PanPages);