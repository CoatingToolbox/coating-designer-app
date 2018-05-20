
import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import { ReduxMixin } from './redux-mixin.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import './components/nav-drawer/nav-drawer.js';
import './components/app-icons.js';
import './pages/home-page.js';
import './pages/tablet-overview-page.js';
import './pages/tablet-designer-page.js';
import './pages/tablet-library-page.js';
import './pages/pan-overview-page.js';
import './pages/pan-designer-page.js';
import './pages/pan-library-page.js';
import './pages/coating-overview-page.js';
import './pages/coating-designer-page.js';
import './pages/coating-library-page.js';

class AppShell extends ReduxMixin(PolymerElement) {
  
  static get properties() {
    return {
      route: Object,
      routeData: Object,
      page: String,
      user: Object,
    };
  }
  
  firebaseLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.error('Error signing into firebase.');
    });
  }
  
  ready() {
    super.ready();
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.user = user;
        this.dispatch({
          type: "SET_USER",
          value: this.user
        });
        
        this.dispatch({
          type: "SET_ADMIN",
          value: (this.user.email === 'jhansell@colorcon.com')
        });
      } 
      
    });
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
  
  _toggleDrawer() {
    this.$.drawer.toggle();
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
          background-color: var(--white-color);
          color: var(--text-color);
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        app-header #user-name {
          font-size: 16px;
          color: var(--text-light-color);
        }
        app-header .icon {
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--app-dark-color);
          background-color: var(--app-light-color);
        }
        #content-layout {
          display: flex;
        }
        iron-pages {
          flex-grow: 1;
          overflow: auto;
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
            <paper-icon-button icon='app-icons:menu' on-click='_toggleDrawer'></paper-icon-button>
            <page-title>Colorcon Coating Guide</page-title>
            <div class='icon'></div>
            <div id='user-name'>[[user.email]]</div>
          </app-toolbar>
        </app-header>
      
        <div id='content-layout'>
          <nav-drawer id='drawer'></nav-drawer>
          <iron-pages  selected='[[page]]' attr-for-selected='page' fallback-selection='home'>
          
            <home-page page='home'></home-page>
            
            <tablet-overview-page page='tablet-overview'></tablet-overview-page>
            <tablet-library-page page='tablet-library'></tablet-library-page>
            <tablet-designer-page page='tablet-designer'></tablet-designer-page>
            
            <pan-overview-page page='pan-overview'></pan-overview-page>
            <pan-library-page page='pan-library'></pan-library-page>
            <pan-designer-page page='pan-designer'></pan-designer-page>
            
            <coating-overview-page page='coating-overview'></coating-overview-page>
            <coating-library-page page='coating-library'></coating-library-page>
            <coating-designer-page page='coating-designer'></coating-designer-page>
          </iron-pages>
        
        </div>
        
      </app-header-layout>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('app-shell', AppShell);