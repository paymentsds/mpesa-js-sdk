# JavaScript M-Pesa SDK


<p align="center">
<a href="https://github.com/paymentsds/mpesa-js-sdk"><img src="https://img.shields.io/npm/dm/@paymentsds/mpesa" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/@paymentsds/mpesa"><img src="https://img.shields.io/npm/v/@paymentsds/mpesa" alt="Latest Stable Version"></a>
<a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" alt="License"></a>
</p>

This is a library willing to help you to integrate the [Vodacom M-Pesa](https://developer.mpesa.vm.co.mz) operations to your application.

<br>

### Features

Using this library, you can implement the following operations:

- Receive money from a mobile account to a business account (C2B)
- Send money from a business account to a mobile account (B2C)
- Send money from a business account to another business account (B2B)
- Revert any of the transactions above mentioned
- Query the status of a transaction

<br><br>

## Requirements

- [NodeJS v12.0+](https://nodejs.org)
- [NPM](https://npmjs.com) or [Yarn](https://yarnpkg.com)
- Valid credentials obtained from the [Mpesa Developer](https://developer.mpesa.vm.co.mz) portal


<br><br>


## Installation

<br>

### Using NPM

```bash
npm install --save @paymentsds/mpesa
```
<br>

### Using Yarn
```bash
yarn add @paymentsds/mpesa
```

<br><br>

## Usage

Using this SDK is very simple and fast, let us see some examples:

<br>

#### Client configuration
```javascript
import { Client } from '@paymentsds/mpesa'

const client = new Client({
   apiKey: '<REPLACE>',              // API Key
   publicKey: '<REPLACE>',           // Public Key
   serviceProviderCode: '<REPLACE>', // Service Provider Code,
   initiatorIdentifier: '<REPLACE>', // Initiator Identifier,
   securityIdentifier: '<REPLACE>',  // Security Credential
   timeout: '<REPLACE>',             // time in seconds
   debugging: true,                 
   verifySSL: false,
   userAgent: '<REPLACE>' 
});
```

<br>

#### C2B Transaction (Receive money from mobile account)

<br>

##### On ES6 Modules

```javascript
import { Client } from '@paymentsds/mpesa'

const client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>' // Service Provider Code
});

const paymentData = {
   from: '841234567',               // Customer MSISDN
   reference: '11114',              // Third Party Reference
   transaction: 'T12344CC',          // Transaction Reference
   amount: '10'                     // Amount
};

client.receive(paymentData).then(r => {
   // Handle success scenario
}).catch(e =>{
   // Handle success scenario
});
```

##### CommonJS

```javascript
var Client = require("@paymentsds/mpesa").Client;

var client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>' // Service Provider Code
});

var paymentData = {
   from: '841234567',               // Customer MSISDN
   reference: '11114',              //  Third Party Reference
   transaction: 'T12344CC',          //  Transaction Reference
   amount: '10'                     //  Amount
};

client.receive(paymentData).then(function(r) {
   // Handle success scenario
}).catch(function(e) {
   // Handle success scenario
});
```

<br>

#### B2C Transaction (Sending money to mobile account)

<br>

##### On ES6 Modules

```javascript
import { Client } from '@paymentsds/mpesa'

const client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>' // Service Provider Code
});

const paymentData = {
   to: '841234567',               // Customer MSISDN
   reference: '11114',              // Third Party Reference
   transaction: 'T12344CC',          // Transaction Reference
   amount: '10'                     // Amount
};

client.send(paymentData).then(function(r) {
   // Handle success scenario
}).catch(function(e) {
   // Handle failure scenario
});
```

##### CommonJS

```javascript
let Client = require("@paymentsds/mpesa").Client;

let client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>' // Service Provider Code
});

let paymentData = {
   to: '841234567',               // Customer MSISDN
   reference: '11114',              // Third Party Reference
   transaction: 'T12344CC',          // Transaction Reference
   amount: '10'                     // Amount
};

client.send(paymentData).then(r => {
   // Handle success scenario
}).catch(e =>{
   // Handle failure scenario
});
```

<br>

#### B2B Transaction (Sending money to business account)

<br>

##### On ES6 Modules

```javascript
import { Client } from '@paymentsds/mpesa'

const client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>' // Service Provider Code
});

const paymentData = {
   to: '979797',                 // Receiver Party Code
   reference: '11114',              // Third Party Reference
   transaction: 'T12344CC',          // Transaction Reference
   amount: '10'                     // Amount
};

client.send(paymentData).then(r => {
   // Handle success scenario
}).catch(e =>{
   // Handle failure scenario
});
```

##### CommonJS

```javascript
let Client = require("@paymentsds/mpesa").Client;

let client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>' // Service Provider Code
});

let paymentData = {
   to: '979797',                    // Receiver Party Code
   reference: '11114',              // Third Party Reference
   transaction: 'T12344CC',          // Transaction Reference
   amount: '10'                     // Amount
};

client.send(paymentData).then(function(r) {
   // Handle success scenario
}).catch(function(e) {
   // Handle failure scenario
});
```

<br>


#### Transaction Reversal

<br>

##### On ES6 Modules

```javascript
import { Client } from '@paymentsds/mpesa'

const client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>', // Service Provider Code,
   initiatorIdentifier: '<REPLACE>', // Initiator Identifier,
   securityCredential: '<REPLACE>'  // Security Credential
});

const reversionData = {
   reference: '11114',           // Third Party Reference
   transaction: 'T12344CC',       // Transaction ID
   amount: '10'                  // Reversal Amount
};

client.revert(reversionData).then(r => {
   // Handle success scenario
}).catch(e =>{
   // Handle failure scenario
});
```

##### CommonJS

```javascript
let Client = require("@paymentsds/mpesa").Client;

let client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>', // Service Provider Code,
   initiatorIdentifier: '<REPLACE>', // Initiator Identifier,
   securityCredential: '<REPLACE>'  // Security Credential
});

let reversionData = {
   reference: '11114',           // Third Party Reference
   transaction: 'T12344CC',       // Transaction ID
   amount: '10'                  // Reversal Amount
};

client.revert(reversionData).then(function(r) {
   // Handle success scenario
}).catch(function(e) {
   // Handle failure scenario
});
```

<br>

#### Query the transaction status

<br>

##### On ES6 Modules

```javascript
import { Client } from '@paymentsds/mpesa'

const client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>', // Service Provider Code,
});

const reversionData = {
   reference: '11114', // Third Party Reference
   subject: '5C1400CVRO', // Query Reference
};

client.query(reversionData).then(r => {
   // Handle success scenario
}).catch(e => {
   // Handle failure scenario
});
```

##### CommonJS

```javascript
let Client = require('@paymentsds/mpesa');

let client = new Client({
   apiKey: '<REPLACE>',             // API Key
   publicKey: '<REPLACE>',          // Public Key
   serviceProviderCode: '<REPLACE>', // Service Provider Code,
});

let reversionData = {
   reference: '11114', // Third Party Reference
   subject: '5C1400CVRO', // Query Reference
};

client.query(reversionData).then(function(r) {
   // Handle success scenario
}).catch(function(e) {
   // Handle failure scenario
});
```

<br><br>

## Friends

- [M-Pesa SDK for Python](https://github.com/paymentsds/mpesa-python-sdk)
- [M-Pesa SDK for Java](https://github.com/paymentsds/mpesa-java-sdk)
- [M-Pesa SDK for PHP](https://github.com/paymentsds/mpesa-php-sdk)
- [M-Pesa SDK for Ruby](https://github.com/paymentsds/mpesa-ruby-sdk)


<br><br>

## Authors <a name="authors"></a>

- [Anísio Mandlate](https://github.com/AnisioMandlate)
- [Edson Michaque](https://github.com/edsonmichaque)
- [Elton Laice](https://github.com/eltonlaice)
- [Nélio Macombo](https://github.com/neliomacombo)


<br><br>

## Contributing

Thank you for considering contributing to this package. If you wish to do it, email us at [developers@paymentsds.org](mailto:developers@paymentsds.org) and we will get back to you as soon as possible.


<br><br>

## Security Vulnerabilities

If you discover a security vulnerability, please email us at [developers@paymentsds.org](mailto:developers@paymentsds.org) and we will address the issue with the needed urgency.

<br><br>

## License

Copyright 2022 &copy; The PaymentsDS Team

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
