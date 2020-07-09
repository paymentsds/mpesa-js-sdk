export class Environment {
  static defaultProperties = ["name", "scheme", "domain"];

  constructor(args) {
    if (args !== null && args !== undefined) {
      for (const key of Environment.defaultProperties) {
        if (args.hasOwnProperty(key)) {
          this[key] = args[key];
        }
      }
    }
  }

  toURL() {
      return `${this.scheme}://${this.domain}`;
  }

  static fromURL(url) {
	let parts;
	if (/^https:\/\//.test(url) || /^http:\/\//.test(url)) {
		parts = url.split('://');
  	} else {
		parts = ['https', url];
	}

	return new Environment({scheme: parts[0], domain: parts[1]})
  }

  isValid() {
    return this.scheme != null && this.domain != null;
  }
}
