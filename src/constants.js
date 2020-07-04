const C2B_PAYMENT = 'C2B_PAYMENT'
const B2B_PAYMENT = 'C2B_PAYMENT'
const B2C_PAYMENT = 'C2B_PAYMENT'
const REVERSAL = 'C2B_PAYMENT'
const QUERY_TRANSACTION_STATUS = 'C2B_PAYMENT'

const OPERATIONS = {
	[C2B_PAYMENT]: new Operation({
	    method: 'get',
	    port: '18352',
	    path: '/ipg/v1x/',
	    mapping: {
	    					number: 'input_CustomerMSISDN',
						from: 'input_CustomerMSISDN', 
						to: 'input_ServiceProviderCode', 
						amount: 'input_Amount',
						transaction: 'input_TransactionReference',
						reference: 'input_ThirdPartyReference'	
	    },
	    validation: {
	    },
	    required: [
	    ],
	    optional: [
	    ],
	}),
	
	[B2B_PAYMENT]: new Operation({
	    method: 'get',
	    port: '18352',
	    path: '/ipg/v1x/',
	    mapping: {
	    					number: 'input_CustomerMSISDN',
						from: 'input_CustomerMSISDN', 
						to: 'input_ServiceProviderCode', 
						amount: 'input_Amount',
						transaction: 'input_TransactionReference',
						reference: 'input_ThirdPartyReference'	
	    },
	    validation: {
	    },
	    required: [
	    ],
	    optional: [
	    ],
	}),
	
	[B2C_PAYMENT]: new Operation({
	    method: 'get',
	    port: '18352',
	    path: '/ipg/v1x/',
	    mapping: {
	    					number: 'input_CustomerMSISDN',
						from: 'input_CustomerMSISDN', 
						to: 'input_ServiceProviderCode', 
						amount: 'input_Amount',
						transaction: 'input_TransactionReference',
						reference: 'input_ThirdPartyReference'	
	    },
	    validation: {
	    },
	    required: [
	    ],
	    optional: [
	    ],
	}),
	
	[REVERSAL]: new Operation({
	    method: 'get',
	    port: '18352',
	    path: '/ipg/v1x/',
	    mapping: {
	    					number: 'input_CustomerMSISDN',
						from: 'input_CustomerMSISDN', 
						to: 'input_ServiceProviderCode', 
						amount: 'input_Amount',
						transaction: 'input_TransactionReference',
						reference: 'input_ThirdPartyReference'	
	    },
	    validation: {
	    },
	    required: [
	    ],
	    optional: [
	    ],
	}),
	
	[QUERY_TRANSACTION_STATUS]: new Operation({
	    method: 'get',
	    port: '18352',
	    path: '/ipg/v1x/',
	    mapping: {
	    					number: 'input_CustomerMSISDN',
						from: 'input_CustomerMSISDN', 
						to: 'input_ServiceProviderCode', 
						amount: 'input_Amount',
						transaction: 'input_TransactionReference',
						reference: 'input_ThirdPartyReference'	
	    },
	    validation: {
	    },
	    required: [
	    ],
	    optional: [
	    ],
	})
}

export {
	C2B_PAYMENT,
	B2B_PAYMENT,
	B2C_PAYMENT,
	REVERSAL,
	QUERY_TRANSACTION_STATUS,
	OPERATIONS
}
