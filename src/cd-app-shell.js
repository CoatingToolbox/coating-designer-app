
import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import './pages/cd-home-page.js';

class CdAppShell extends PolymerElement {
  
  static get properties() {
    return {
      route: Object,
      routeData: Object,
      page: String
    }
  }
  
  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
      '_pageChanged(page)'
    ]
  }
  
      
  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    this.page = page || 'home';
  }
  
  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    
  }
  
  static get ready() {
    super.ready()
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        app-header {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        app-header .user-name {
          font-size: 16px;
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
            <div main-title>Coating Designer</div>
            <div spacer></div>
            <div class='user-name'>jhansell@colorcon.com</div>
          </app-toolbar>
        </app-header>
        
        <iron-pages selected='[[page]]' attr-for-selected='page'>
          <cd-home-page page='home'></cd-home-page>
          <div page='two'>Two</div>
          <div page='three'>Three</div>
        </iron-pages>
        
      </app-header-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('cd-app-shell', CdAppShell);