export class Version {
  construct(major, minor, patch) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  get major() {
    return this.major;
  }

  get minor() {
    return this.minor;
  }

  get patch() {
    return this.patch;
  }

  set major(major) {
    this.major = major;
  }

  set minor(minor) {
    this.minor = minor;
  }

  set patch(patch) {
    this.patch = patch;
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}
