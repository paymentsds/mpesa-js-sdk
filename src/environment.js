export class Environment {
    static defaultProperties = [
       	'name', 'scheme', 'domain'
    ];
    
	static SANDBOX = new Environment({
			scheme: 'https', 
			domain: 'api.sandbox.vm.co.mz'
	});
	
	static PRODUCTION = new Environment({
			scheme: 'https', 
			domain: 'api.mpesa.vm.co.mz'
		});
		
	constructor(args) {
	    if (args !== null && args !== undefined) {		
			for (let key of Environment.defaultProperties) {
                if (args.hasOwnProperty(key)) { 
                	this[key] = args[key]; 
                }
            }
		}
	}

	toURL() {
	    if (this.isValid()) {
		    return `${this.scheme}://${this.domain}`;
		} 
		
		throw 'Invalid';
	}

	static fromURL(url) {
	}
	
	isValid() {
	    return this.scheme != null && this.domain != null;
	}
}
