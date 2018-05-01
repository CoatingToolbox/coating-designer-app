
import '../../node_modules/@polymer/iron-iconset-svg/iron-iconset-svg.js';

const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `
    <iron-iconset-svg name='app-icons' size='24'>
        <svg>
            <def>
            
              <g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
      
              <g id='arrow-left'>
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
              </g>
                      
              <g id='load'>
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
              </g>
              <g id="library">
                <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path>
              </g>
              <g id="edit">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </g>
              
              <g id='company-info'>
                <path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z" />
              </g>
              
              <g id='product-info'>
                <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
              </g>
              
              <g id='ruler'>
                <path d="M1.39,18.36L3.16,16.6L4.58,18L5.64,16.95L4.22,15.54L5.64,14.12L8.11,16.6L9.17,15.54L6.7,13.06L8.11,11.65L9.53,13.06L10.59,12L9.17,10.59L10.59,9.17L13.06,11.65L14.12,10.59L11.65,8.11L13.06,6.7L14.47,8.11L15.54,7.05L14.12,5.64L15.54,4.22L18,6.7L19.07,5.64L16.6,3.16L18.36,1.39L22.61,5.64L5.64,22.61L1.39,18.36Z" />
              </g>
              
              <g id='density'>
                <path d="M11,9H13V11H11V9M9,11H11V13H9V11M13,11H15V13H13V11M15,9H17V11H15V9M7,9H9V11H7V9M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M9,18H7V16H9V18M13,18H11V16H13V18M17,18H15V16H17V18M19,11H17V13H19V15H17V13H15V15H13V13H11V15H9V13H7V15H5V13H7V11H5V5H19V11Z" />
              </g>
              
              <g id='weight'>
                <path d="M12,3A4,4 0 0,1 16,7C16,7.73 15.81,8.41 15.46,9H18C18.95,9 19.75,9.67 19.95,10.56C21.96,18.57 22,18.78 22,19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19C2,18.78 2.04,18.57 4.05,10.56C4.25,9.67 5.05,9 6,9H8.54C8.19,8.41 8,7.73 8,7A4,4 0 0,1 12,3M12,5A2,2 0 0,0 10,7A2,2 0 0,0 12,9A2,2 0 0,0 14,7A2,2 0 0,0 12,5M9.04,15.44L10.4,18H12.11L10.07,14.66L11.95,11.94H10.2L8.87,14.33H8.39V11.94H6.97V18H8.39V15.44H9.04M17.31,17.16V14.93H14.95V16.04H15.9V16.79L15.55,16.93L14.94,17C14.59,17 14.31,16.85 14.11,16.6C13.92,16.34 13.82,16 13.82,15.59V14.34C13.82,13.93 13.92,13.6 14.12,13.35C14.32,13.09 14.58,12.97 14.91,12.97C15.24,12.97 15.5,13.05 15.64,13.21C15.8,13.37 15.9,13.61 15.95,13.93H17.27L17.28,13.9C17.23,13.27 17,12.77 16.62,12.4C16.23,12.04 15.64,11.86 14.86,11.86C14.14,11.86 13.56,12.09 13.1,12.55C12.64,13 12.41,13.61 12.41,14.34V15.6C12.41,16.34 12.65,16.94 13.12,17.4C13.58,17.86 14.19,18.09 14.94,18.09C15.53,18.09 16.03,18 16.42,17.81C16.81,17.62 17.11,17.41 17.31,17.16Z" />
              </g>
              
              <g id="volume">
                <path d="M3,3H21V5A2,2 0 0,0 19,7V19A2,2 0 0,1 17,21H7A2,2 0 0,1 5,19V7A2,2 0 0,0 3,5V3M7,5V7H12V8H7V9H10V10H7V11H10V12H7V13H12V14H7V15H10V16H7V19H17V5H7Z" /></path>
              </g>
              
              <g id='surface-area'>
                <path d="M3,3H18V18H3V3M19,19H21V21H19V19M19,16H21V18H19V16M19,13H21V15H19V13M19,10H21V12H19V10M19,7H21V9H19V7M16,19H18V21H16V19M13,19H15V21H13V19M10,19H12V21H10V19M7,19H9V21H7V19Z" />
              </g>
              
              <g id='tooling' style='stroke-width: 0px'>
                <path d="M12.04,2.5L9.53,5H14.53L12.04,2.5M4,7V20H20V7H4M12,0L17,5V5H20A2,2 0 0,1 22,7V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V7A2,2 0 0,1 4,5H7V5L12,0M7,18V14H12V18H7M14,17V10H18V17H14M6,12V9H11V12H6Z" />
             </g>
             
              <g id='chevron-down'>
                <path d="M7,10L12,15L17,10H7Z" />
              </g>
             
              <g id='save'><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></g>

              <g id='shape'>
                <path d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />
              </g>
              
              <g id='round-tablet' style='fill-opacity: 0.4; stroke-width: 0.75px;'>
                  <circle cx='12' cy='12' r='8'></circle>
              </g>
              <g id='oval-tablet' style='fill-opacity: 0.4; stroke-width: 0.75'>
                  <path d="m 2 12 a 10 7 0 0 0 20 0 a 10 7 0 0 0 -20 0 z"></path>
              </g>
              <g id='caplet-tablet' style='fill-opacity: 0.4; stroke-width: 0.75px;'>
                  <path d="m 12 12 m 5.999999999999999 5.4 l -11.999999999999998 0 a 5.4 5.4 0 0 1 0 -10.8 l 11.999999999999998 0 a 5.4 5.4 0 0 1 0 10.8 z"></path>
              </g>
              
              <g id='tablet' style='fill-opacity: 0.4; stroke-width: 2.5px;'>
                  <path d="m 2 9 l 20 0 l 0 6 l -20 0 l 0 -6"></path>
                  <path d="m 2 9 a 33.524 33.524 0 0 1 20 0"></path>
                  <path d="m 2 15 a 33.524 33.524 0 0 0 20 0"></path>
              </g>

              <g id='concavity' style='fill-opacity: 0.4; stroke-width: 0.5px;'>
                <path d="m 2 9 l 20 0 l 0 6 l -20 0 l 0 -6"></path>
                <path d="m 2 9 a 61.0163 61.0163 0 0 1 20 0"stroke-dasharray='0.5 0.5'></path>
                <path d="m 2 9 a 33.524 33.524 0 0 1 20 0"stroke-dasharray='1 1'></path>
                <path d="m 2 9 a 15.052 15.052 0 0 1 20 0"stroke-dasharray='1.5 1.5'></path>
                <path d="m 2 15 a 61.0163 61.0163 0 0 0 20 0"stroke-dasharray='0.5 0.5'></path>
                <path d="m 2 15 a 33.524 33.524 0 0 0 20 0"stroke-dasharray='1 1'></path>
                <path d="m 2 15 a 15.052 15.052 0 0 0 20 0"stroke-dasharray='1.5 1.5'></path>
            </g>
              
            </def>
        </svg>
    </iron-iconset-svg>`;

document.head.appendChild($_documentContainer);