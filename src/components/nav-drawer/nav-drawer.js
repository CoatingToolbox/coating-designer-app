
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-media-query/iron-media-query.js';
import { ReduxMixin } from '../../redux-mixin.js';
import './nav-item.js';
import './nav-icon.js';
import './nav-collapse-item.js';

class NavDrawer extends ReduxMixin(PolymerElement) {
  
  ready() {
    super.ready();
    this.addEventListener('click', () => {
      if(this.smallScreen) { 
        this.toggle(); 
      }
    });
  }
  static get properties () {
    return {
      opened: { type: Boolean, statePath: 'app.isDrawerOpened', reflectToAttribute: true },
      smallScreen: { type: Boolean, value: false, reflectToAttribute: true }
    };
  }
  
  _screenWidthChanged(e) {
    this.opened = !e.detail.value;
  }
  
  toggle() {
    this.dispatch({
      type: "TOGGLE_DRAWER",
    });
  }

  static get template () {
    return html`
      <style>
        :host {
          width: 0px;
          background-color: var(--white-color);
          overflow: auto;
          padding: 16px 0px;
          transition: width 0.2s;
        }
        :host([opened]) {
          width: 224px;
          padding: 16px 8px;
          transition: width 0.2s;
        }
      </style>
      
      <iron-media-query 
        query="(max-width: 1024px)" 
        query-matches="{{smallScreen}}"
        on-query-matches-changed='_screenWidthChanged'>
      </iron-media-query>
      
      <nav-item link='#/home' label='Overview'></nav-item>
      
      <nav-collapse-item label='Materials & Equipment' opened>
      
        <nav-item link='#/tablet-overview' label='Tablet'>
          <nav-icon link='#/tablet-designer' icon='app-icons:edit'></nav-icon>
          <nav-icon link='#/tablet-library' icon='app-icons:library'></nav-icon>
        </nav-item>
        
        <nav-item link='#/pan-overview' label='Pan'>
          <nav-icon link='#/pan-designer' icon='app-icons:edit'></nav-icon>
          <nav-icon link='#/pan-library' icon='app-icons:library'></nav-icon>
        </nav-item>
        
        <nav-item link='#/coating-overview' label='Coating'>
          <nav-icon link='#/coating-designer' icon='app-icons:edit'></nav-icon>
          <nav-icon link='#/coating-library' icon='app-icons:library'></nav-icon>
        </nav-item>
        
      </nav-collapse-item>
      
      <nav-collapse-item label='Trial Setup' opened>
        <nav-item link='#/home' label='Coating Amount'></nav-item>
        <nav-item link='#/home' label='Disperson'></nav-item>
        <nav-item link='#/home' label='Batch Size'></nav-item>
      </nav-collapse-item>
      
      <nav-item link='#/home' label='Process Parameters'></nav-item>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-drawer', NavDrawer);