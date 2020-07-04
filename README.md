# MPesa Javascript SDK

Javascript client for the [Vodacom M-Pesa API](https://developers.mpesa.vm.co.mz)

## Contents

1. [Features](#features)
1. [Requirements](#requirements)
1. [Installation](#installation)
   1. [Using NPM](#installation-npm)
   1. [Using Yarn](#installation-yarn)
   1. [Manual Installation](#installation-manual)
1. [Configuration](#configuration)
1. [Usage](#usage)
   1. [Quickstart](#contributing)
   1. [Examples](#contributing)
1. [Related Projects](#related)
   1. [Dependencies](#contributing)
   1. [Friends](#contributing)
   1. [Alternatives](#contributing)
1. [Contributing](#contributing)
1. [Changelog](#changelog)
1. [Authors](#authors)
1. [Credits](#credits)
1. [License](#license)

## 1. Features <a name="features"></a>

- Make C2B transaction
- Make B2C transaction
- Make B2B transaction
- Revert a transaction
- Query transaction status

## 2. Requirements <a name="requirements"></a>

- Node >= 6.0.0

## 3. Installation <a name="installation"></a>

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

## 4. Configuration <a name="configuration"></a>

```javascript
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>'
	environment: Environment.SANDBOX
});
```

## 5. Usage <a name="usage"></a>

### Initialization <a name="usage-quickstart"></a>

```javascript
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	apiKey: '<YOUR API KEY HERE>',
	publicKey: '<YOUR PUBLIC KEY HERE>',
	debugging: false,
	verifySSL: false,
	serviceProviderCode: '<YOUR SERVICE PROVIDER CODE HERE>'
	environment: Environment.SANDBOX
});
```

### Receive money from a mobile wallet

```javascript
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	...
});

let data = {
	from: '84XXXXXXX',
	transaction: 'TX',
	reference: 'REF'
};

client.receive(data)
.then(e => {
	// Handle the success
}).catch(e => {
	// Handle the error
});
```

### Send money to a mobile wallet

```javascript
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	...
});

let data = {
	from: '84XXXXXXX',
	transaction: 'TX',
	reference: 'REF'
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
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	...
});

let data = {
	to: '84XXXXXXX',
	transaction: 'TX',
	reference: 'REF'
};

client.send(data)
.then(e => {
	// Handle the success
}).catch(e => {
	// Handle the error
});
```

### Revert a transaction

```javascript
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	...
	securityCode: '<YOUR SECURITY CODE>',
	initiatorIdentifier: '<YOUR INITIATOR IDENTIFIER>'
});

let data = {
	reference: 'REF'
};

client.revert(data)
.then(e => {
	// Handle the success
}).catch(e => {
	// Handle the error
});
```

### Query the status of a transaction

```javascript
import { Client, Environment } from '@paysuite/mpesa';

let client = new Client({
	...
});

let data = {
	from: '84XXXXXXX',
	transaction: 'TX',
	reference: 'REF'
};

client.query(data)
.then(e => {
	// Handle the success
}).catch(e => {
	// Handle the error
});
```

### Examples <a name="usage-examples"></a>

## 5. Related Projects <a name="related"></a>

### Dependencies <a name="related-dependencies"></a>

### Friends <a name="related-friends"></a>

### Alternatives <a name="related-alternatives"></a>

## 6. Contributing <a name="contributing"></a>

## 7. Changelog <a name="changelog"></a>

## 8. Authors <a name="authors"></a>

- Edson Michaque
- Nélio Macombo

## 9. Credits <a name="credits"></a>

## 10. License <a name="license"></a>

Copyright 2020 Edson Michaque, Nélio Macombo

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
