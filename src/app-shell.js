
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from './redux-mixin.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-pages/iron-pages.js';
import './components/app-icons.js';
import './components/nav-drawer/nav-item.js';
import './components/nav-drawer/nav-icon.js';
import './components/nav-drawer/nav-section.js';

class AppShell extends ReduxMixin(PolymerElement) {
  
  static get properties() {
    return {
      route: Object,
      routeData: Object,
      page: { type: String, statePath: 'app.page' },
      user: { type: Object, statePath: 'app.user' },
      isDrawerOpened: { type: Boolean, statePath: 'app.isDrawerOpened' }
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
        this.dispatch({
          type: "SET_USER",
          value: user
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
    this.dispatch({
      type: "SET_PAGE",
      value: page
    });
  }
  
  _toggleDrawer() {
    this.dispatch({
      type: "TOGGLE_DRAWER"
    });
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
        }
        app-toolbar {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        app-header #user-name {
          font-size: 16px;
        }
        app-header .icon {
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--white-color);
          background-color: var(--app-dark-color);
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
      
      <app-drawer-layout fullbleed force-narrow>
      
        <app-drawer slot='drawer'>
          <app-toolbar>Menu</app-toolbar>
          <nav-item link='#/home' label='Overview'></nav-item>
      
          <nav-section label='Materials & Equipment'></nav-section>
          
          <nav-item link='#/tablet-overview' label='Tablet' sub-item>
            <nav-icon link='#/tablet-designer' icon='app-icons:edit'></nav-icon>
            <nav-icon link='#/tablet-library' icon='app-icons:library'></nav-icon>
          </nav-item>
          
          <nav-item link='#/pan-overview' label='Pan' sub-item>
            <nav-icon link='#/pan-designer' icon='app-icons:edit'></nav-icon>
            <nav-icon link='#/pan-library' icon='app-icons:library'></nav-icon>
          </nav-item>
          
          <nav-item link='#/coating-overview' label='Coating' sub-item>
            <nav-icon link='#/coating-designer' icon='app-icons:edit'></nav-icon>
            <nav-icon link='#/coating-library' icon='app-icons:library'></nav-icon>
          </nav-item>
            
          <nav-section label='Trial Setup'></nav-section>
          <nav-item link='#/home' label='Coating Amount' sub-item></nav-item>
          <nav-item link='#/home' label='Disperson' sub-item></nav-item>
          <nav-item link='#/home' label='Batch Size' sub-item></nav-item>
          
          <nav-item link='#/home' label='Process Parameters'></nav-item>
       </app-drawer>
      
      <app-header-layout>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <paper-icon-button icon='app-icons:menu' drawer-toggle></paper-icon-button>
            <div main-title>Colorcon Coating Guide</div>
            <div class='icon'></div>
            <div id='user-name'>[[user.email]]</div>
          </app-toolbar>
        </app-header>
      
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
        
      </app-header-layout>
        
    </app-drawer-layout>    
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('app-shell', AppShell);