
import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import './pages/home-page.js';
import './pages/tablet-pages.js';

class AppShell extends PolymerElement {
  
  static get properties() {
    return {
      route: Object,
      routeData: Object,
      page: String
    };
  }
  
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }    
  
  _routePageChanged(page) {
    window.scrollTo(0, 0);
    // Load page import on demand.
    this.page = page || 'home';
    // Load page import on demand. Show 404 page if fails
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
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
        <home-page page='home'></home-page>
        <tablet-pages page='tablet'></tablet-pages>
      </iron-pages>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('app-shell', AppShell);