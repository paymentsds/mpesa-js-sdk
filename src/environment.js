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
    if (this.isValid()) {
      return `${this.scheme}://${this.domain}`;
    }

    throw "Invalid";
  }

  static fromURL(url) {}

  isValid() {
    return this.scheme != null && this.domain != null;
  }
}
