# PaymentsDS MPesa SDK for Javascript

MPesa JS SDK is an unofficial library to help developers integrating every [MPesa](https://developer.mpesa.vm.co.mz) operations to their Javascript (browsers and Node.JS environments) applications.

## Contents

1. [Features](#features)
1. [Requirements](#requirements)
1. [Configuration](#configuration)
1. [Usage](#usage)
   1. [Quickstart](#contributing)
   1. [Examples](#contributing)
1. [Installation](#installation)
   1. [Using NPM](#installation-npm)
   1. [Using Yarn](#installation-yarn)
   1. [Manual Installation](#installation-manual)
1. [Related Projects](#related)
   1. [Dependencies](#contributing)
   1. [Friends](#contributing)
   1. [Alternatives](#contributing)
1. [Contributing](#contributing)
1. [Changelog](#changelog)
1. [Authors](#authors)
1. [Credits](#credits)
1. [License](#license)

## Features <a name="features"></a>
- Make C2B transaction
- Make B2C transaction
- Make B2B transaction
- Revert a transaction
- Query transaction status

## Requirements <a name="requirements"></a>

- [Node.js](https://nodejs.org/en/) v6.0.0 or later
- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com)

## Usage <a name="usage"></a>
### Quickstart <a name="usage-quickstart"></a>
```javascript
import { Client } from '@paysuite/mpesa';

let client = new Client({
	apiKey: <REPLACE>,
	publicKey: <REPLACE>,
	serviceProviderCode: <REPLACE>
});

let data = {
	from: '84XXXXXXX',
	amount: '10',
	transaction: 'TX', 
	reference: 'REF'
};

client.receive(data)
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log(error);
	});
```

### Receive money from a mobile wallet

```javascript
import { Client, SANDBOX } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>',
	environment: SANDBOX
});

let form = {
	from: '258843330333',
	transaction: '123456789',
	reference: '123456789',
	amount: '1000'
};

client.receive(form)
.then(r => {
	console.log(r);
}).catch(e => {
	console.log(e);
});
```

### Send money to a mobile wallet

```javascript
import { Client, SANDBOX } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>',
	environment: SANDBOX
});

let data = {
	to: '258843330333',
	transaction: '123456789',
	reference: '123456789',
	amount: '1000'
};

client.send(data)
.then(e => {
	// Handle the success
}).catch(e => {
	// Handle the error
});
```

### Send money to a business wallet

```javascript
import { Client, SANDBOX } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>',
	environment: SANDBOX
});

let form = {
	to: '171717',
	transaction: '123456789',
	reference: '123456789',
	amount: '1000'
};

client.send(form)
.then(r => {
	console.log(r);
}).catch(e => {
	console.log(e);
});
```

### Revert a transaction

```javascript
import { Client, SANDBOX } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>',
	environment: SANDBOX,
	securityCode: '<YOUR SECURITY CODE>',
	initiatorIdentifier: '<YOUR INITIATOR IDENTIFIER>'
});

let data = {
	reference: 'REF'
};

client.revert(data)
.then(r => {
	console.log(r);
}).catch(e => {
	console.log(e);
});
```

### Query the status of a transaction

```javascript
import { Client, SANDBOX } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>',
	environment: SANDBOX
});

let data = {
	to: '84XXXXXXX',
	transaction: '123456789',
	reference: '123456789'
};

client.query(data)
.then(r => {
	console.log(r);
}).catch(e => {
	console.log(e);
});
```

### Examples <a name="usage-examples"></a>
- [Make C2B transaction](examples/c2bPayment.js)
- [Make B2C transaction](examples/b2cPayment.js)
- [Make B2B transaction](examples/b2bPayment.js)
- [Revert a transaction](examples/reversal.js)
- [Query transaction status](examples/queryTransactionStatus.js)

## Installation <a name="installation"></a>
### Using NPM <a name="installation-npm"></a>
```bash
$ npm install @paysuite/mpesa --save
```

```json
{
	"dependencies": {
		"@paysuite/mpesa"
	}
}
```
```bash
$ npm update
```

### Using Yarn <a name="installation-yarn"></a>
```bash
yarn add @paysuite/mpesa
```

```json
{
	"dependencies": {
		"@paysuite/mpesa"
	}
}
```

```bash
$ yarn update
```

### Manual Installation <a name="installation-manual"></a>
```bash
$ git clone https://github.com/paysuite/mpesa-js-sdk.git
$ npm install ./mpesa-js-sdk
$ cd mpesa-js-sdk
$ npm link
```

## Configuration <a name="configuration"></a>
The complete set of configurations looks like this:

```javascript
import { Client, SANDBOX } from '@paysuite/mpesa';

let client = new Client({
	apiKey: <REPLACE>,
	publicKey: <REPLACE>,
	debugging: <REPLACE>,
	verifySSL: <REPLACE>,
	serviceProviderCode: <REPLACE>,
	initiatorIdentifier: <REPLACE>,
	origin: <REPLACE>,
	userAgent: <REPLACE>,
	timeout: <REPLACE>,
	environment: <REPLACE>
});
```

The minimal configuration is:
```javascript
import { Client } from '@paysuite/mpesa';

let client = new Client({
	apiKey: <REPLACE>,
	publicKey: <REPLACE>
})
```

Or if you have pre-calculated the access token offline:

```javascript
import { Client } from '@paysuite/mpesa';

let client = new Client({
	accessToken: <REPLACE>,
})
```

## Related Projects <a name="related"></a>

### Dependencies <a name="related-dependencies"></a>
- [Axios](https://github.com/axios/axios)

### Friends <a name="related-friends"></a>

### Alternatives <a name="related-alternatives"></a>
- [mpesa-node-api](https://github.com/rosariopfernandes/mpesa-node-api)

### Inspiration
- [rosariopfernandes/mpesa-node-api](https://github.com/abdulmueid/mpesa-php-api)
- [karson/mpesa-php-sdk](https://github.com/karson/mpesa-php-sdk)
- [codeonweekends/mpesa-php-sdk](https://github.com/codeonweekends/mpesa-php-sdk)
- [abdulmueid/mpesa-php-api](https://github.com/abdulmueid/mpesa-php-api)
- [realdm/mpesasdk](https://github.com/realdm/mpesasdk)

## Contributing <a name="contributing"></a>

## Changelog <a name="changelog"></a>

## Authors <a name="authors"></a>

- [Edson Michaque](https://github.com/edsonmichaque)
- [Nélio Macombo](https://github.com/neliomacombo)

## Credits <a name="credits"></a>

## License <a name="license"></a>

Copyright 2020 Edson Michaque and Nélio Macombo

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
