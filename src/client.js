import { Environment } from './environment';
import { Configuration } from './configuration';
import { Errors } from './error';
import { PaymentDirection } from './payment-direction';

export class Client {
	constructor(args) {
	    this.configuration = new Configuration({});
	    
	    if (args !== null && args !== undefined) {
	        this.initializeConfiguration(args);
	    }
	    
	    this.initializeHttpClient();
	}
	
	initializeHttpClient() {
	    if (this.configuration.isValid()) {
	        let headers = this.configuration.generateHeaders();	        
	        this.httpClient = /*axios.create*/({
	            timeout: this.configuration.timeout,
	            headers: headers
	        });
	    }
	}
	
	configure(args) {
	    this.initializeConfiguration(args);
	    this.initializeHttpClient();
	    return this;
	}
	
    initializeConfiguration(args) {
        for (let key of Configuration.defaultProperties) {
            if (args.hasOwnProperty(key)) { 
                this.configuration[key] = args[key]; 
            }
        }          
    }
    
    handlePayment(data, direction) {  	
    	let requiredProperties = [
			'reference', 
			'amount', 
			'mode'
    	];
    	
    	let optionalProperties = [];
    	let defaultOptional; 
    	
    	if (direction == PaymentDirection.OUTGOING) {
    		defaultOptional = 'from';
    		requiredProperties.push('to');
    		optionalProperties.push(defaultOptional);		
    	} else {
    		defaultOptional = 'to';
    		requiredProperties.push('from');
    		optionalProperties.push(defaultOptional);
    	}
    	
    	let hasProperties = requiredProperties.filter(e => { 
			return Object.keys(data).includes(e); 
		});
					
		let hasOptionalProperties = optionalProperties.filter(e => { 
			return Object.keys(data).includes(e); 
		});
			
		if (hasProperties.length == requiredProperties.length) {
			if (!hasOptionalProperties.includes(defaultOptional)) { 
				if ((this.configuration.serviceProviderCode != undefined)) {
					data[defaultOptional] = this.configuration.serviceProviderCode;
					return data;
				} else {		
					return Promise.reject(Errors.INVALID_MODE);
				}				
			}
				
			return data;
		} else {
			return Promise.reject(Errors.INVALID_CONFIGURATION);
		}
    }
    
	send(data) {
	    if (this.configuration.isValid()) {
	    	if (data.hasOwnProperty('mode')) {
    			let enrichedData = this.handlePayment(data, PaymentDirection.OUTGOING);	    				
    				if (data.mode == 'b2b') {
						return this.handleRequest(this.configuration.defaultOperations.B2C_PAYMENT, enrichedData); 
					} 
						
					if (data.mode == 'b2c') {
						return this.handleRequest(this.configuration.defaultOperations.B2B_PAYMENT, enrichedData); 
					}
						
					return Promise.reject(Errors.INVALID_MODE);
	    	}
	    	
	    	return Promise.reject(Errors.INVALID_MODE);
	    }
	    
	   	return Promise.reject(Errors.INVALID_CONFIGURATION);
	}
	
	receive(data) {
		let enrichedData = this.handlePayment(data, PaymentDirection.INCOMING);
		
	    if (this.configuration.isValid()) {
	        return handleRequest(configuration.defaultOperations.C2B_PAYMENT, enrichedData); 
	    }
	    
	   	return Promise.reject(Errors.INVALID_CONFIURATION);
	}
	
	revert(data) {
	    if (this.configuration.isValid()) {
	        return handleRequest(configuration.defaultOperations.REVERSAL, data); 
	    }
	    
	   	return Promise.reject(Errors.INVALID_CONFIURATION);
	}
	
	query(data) {
	    if (this.configuration.isValid()) {
	        return handleRequest(configuration.defaultOperations.QUERY_TRANSACTION_STATUS, data); 
	    }
	    
	   	return Promise.reject(Errors.INVALID_CONFIURATION);
	}
	
	refund(data) { 
		return revert(data); 
	}

    handleResponse(r) {
        let data = parseResponse(r);
        
        if (r.status == 200 || r.status == 201) {
            let data = this.parseResponse(r);
                     
            return Promise.resolve(data);
        } else {
            let error = this.handleUnsuccessfulError(e);    
            
            return Promise.reject(data);
        }
    }
    
    parseResponse(r) {
        let output = {};
        
        let mapping = {
            conversation: 'output_ConversationID',
            transaction: 'output_TransactionID',
            description: 'output_ResponseDesc',
            code: 'output_ResponseCode',
            reference: 'output_ThirdPartyReference',
            status: 'output_ResponseTransactionStatus'
        };
        
        for (let key in mapping) {
            if (r.data.hasOwnProperty(mapping[key])) {
                if (key == 'responseDesc') {
                    if (output['response'] == undefined) output['response'] = {};
                    output['response'][key] = r.data[mapping[key]];
                } if (key == 'responseCode' == undefined) {
                    if (output['response']) output['response'] = {};
                    output['response'][key] = r.data[mapping[key]];
                } else {
                    output[key] = r.data[mapping[key]];
                }
            }
        }
        
        return output;
    }
    
	handleRequest(operation, data) {
		let formatedData = this.formatBody(data);
		
		let errors = this.validateRequest(operation, formatedData);
	    			
	    if (!errors.length) {
			let requestData = this.buildRequest(operation, formatedData);
			
			/*
			
			this.httpClient.request(requestData)
				.then(r => {
				    return handleResponse(r);
				})
				.catch(e => {
				    return handleResponse(e);
				});
			*/
			
			return;
		}
		
		return Promise.reject(errors);

	}
	
	buildRequest(operation, data) {		
		let body = this.serializeBody(operation, data);				
		let requestConfig = {
		    baseURL: this.configuration.generateBaseURL(operation),
		    url: operation.path,
		    method: operation.method.toLowerCase(),
		    responseType: 'json',
		    headers: this.configuration.generateHeaders()
		};
		
		if (operation.input.type == 'body') {
			requestConfig['body'] = body;
		} else {
			requestConfig['params'] = body;
		}
		
		return requestConfig;
	}
	
	serializeBody(operation, data) {
		return this.parseRequest(operation, data);
	}
	
	parseRequest(operation, data) {
        let output = {};	
		
        for (let key in operation.input.mapping) {    	
            if (data.hasOwnProperty(key)) {
                output[operation.input.mapping[key]] = data[key];
            }
        }
        
        return output;
    }
    
    validateRequest(operation, data) {
    	let errors = [];
    	for (let key in data) {

    		if (!operation.input.validation[key].test(data[key])) {
    			errors.push(key);
    		}
    	}
 
    	return errors;
    }
    
    formatBody(data) {
    	let output = {};
    	for (let key in data) {    	
 			output[key] = String(data[key]);
        }
        
        return output;
    }
}
