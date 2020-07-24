export class Response {
  constructor(status, code, description, data) {
    this.status = status;
    this.code = code;
    this.description = description;
    this.data = data;

    if (this.status >= 100 && this.status < 300) {
      this.success = true;
    } else {
      this.success = false;
    }
  }
}
