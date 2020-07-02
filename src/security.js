import crypto from 'crypto';

class PublicKey {
	constructor(key) {
		this.key = crypto.createPublicKey(key);
	}

	encrypt(data) {
		let buffer = Buffer.from(data);
		return crypto.publicEncrypt({key: this.key}, buffer);
	}

	static from(data) {
		let formatedKey = PublicKey.format(data);
		return new PublicKey(formatedKey);
	}

	static format(key) {
		return `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`;
	}
}

class AccessToken {
	static params = [
		'publicKey',
		'apiKey'
	];

	constructor(args) {
		if (args != null && args != undefined) {
			for (let k of AccessToken.params) {
				if (args.hasOwnProperty(k)) {
					this[k] = args[k];
				}
			}
		}
	}

	initializePublicKey() {
		this.publicKeyBuffer = PublicKey.from(this.publicKey);
	}

	generateAccessToken() {
		if (this.publicKey != undefined && this.apiKey != undefined) {
			this.initializePublicKey();

			let tokenBuffer = this.publicKeyBuffer.encrypt(this.apiKey);
			this.token = tokenBuffer.toString('base64');
		}

		if (this.token == undefined) {
			throw 'Invalid (API key and public key) or accessToken';
		}
	}

	from(data) {
		this.token = data;
	}

	toString() {
		this.generateAccessToken();
		return this.token;
	}
}

export { 
	AccessToken
}

