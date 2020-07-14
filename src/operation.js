class Operation {
  constructor(args) {
    if (args !== null && args !== undefined) {
      for (const key of Operation.defaultProperties) {
        if (Object.prototype.hasOwnProperty.call(args, key)) {
          this[key] = args[key];
        }
      }
    }
  }

  toURL() {
    if (this.isValid()) {
      const pathWithoudSlash = this.path.replace(/^\/+/, "");
      return `:${this.port}/${pathWithoudSlash}`;
    }
  }

  isValid() {
    return this.name != null && this.port != null && this.path != null;
  }
}

Operation.defaultProperties = [
  "name",
  "method",
  "port",
  "path",
  "mapping",
  "validation",
  "required",
  "optional",
];

export { Operation };
