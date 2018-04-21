
export class Coating {

        constructor(parameters={}) {
            // VISCOSITY
            this.solids = 0.2;
            this.viscosityIntercept = 20;
            this.viscosityExponent = 10;
            // FILM PROPERTIES
            this.density = 1100000;
            // DESCRIPTION
            this.productName = '';
            this.formulaName = '';
            this.type = '';
            this.color = '';
            this.firebaseKey = '';
            
            // Set the properties that match the class
            Object.getOwnPropertyNames(this).map(name => {
                if(!parameters[name]) { return }
                this[name] = parameters[name];
            });
        }
        
        // Film Properties
        get viscosity() {
            return this.viscosityIntercept * Math.exp(this.viscosityExponent * this.solids);
        }
        set viscosity(viscosity) {
            this.solids = Math.log(viscosity / this.viscosityIntercept) / this.viscosityExponent;
        }
        
        toJSON() {
            return Object.assign({}, this, 
                {
                    viscosity: this.viscosity
                },
                { 
                    formatted: 
                        {
                            solids: `${(this.solids * 100).toFixed(1)}%`,
                            density: `${(this.density * 1e-6).toFixed(2)} g/ml`,
                            viscosity: `${this.viscosity.toFixed(0)} cps`
                        }
                }
            );
        }
        
    }