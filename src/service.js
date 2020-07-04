import { axios } from 'axios'
import { Configuration } from './configuration.js'
import { operations } from './constants.js'

export class Service {
	constructor(args) {
		this.initDefaultConfigs()
		this.initHttpClient()

	}

	initHttpClient() {
		this.httpClient = 
	}

	initDefaultConfigs(args) {
		this.config = new Configuration(args)
	}

	handleSend(intent) {
		operation = this.detectOperation(intent)
		if (operation == 'B2C_PAYMENT')
			return this.handleRequest('B2C_PAYMENT', intent)
		if (operation == 'B2B_PAYMENT')
			return this.handleRequest('B2B_PAYMENT', intent)
		
		// Handle error
	}

	handleReceive(intent){
		return this.handleRequest('C2B_PAYMENT', intent)
	}

	handleRevert(intent) {
		return this.handleRequest('REVERSAL, intent)
	}

	handleQuery(intent) {
		return handleRequest('QUERY_TRANSACTION_STATUS', intent)
	}

	handleRequest(operation, intent) {
		data = this.fillOptionalProperties(operation, intent)
		let missingProperties = this.detectMissingProperties(operation, intent)

		if (missingProperties.length > 0) {
			// return missing data errors
		}

		let validationErrors = this.detectErrors(operation, data)

		if (validationErrors.length > 0) {
			// return validation errors
		}

		// Make request
	}

	detectOperation(data) {
		
	}

	detectErrors(operation, intent) {
		
	}

	fillOptionalPproperties(operation, intent) {
		
	}
}
