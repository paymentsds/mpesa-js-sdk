export class Response {
  constructor(code, description, data) {
    this.code = code;
    this.description = description;
    this.data = data;
  }

  push(error) {
    this.data.push(error);
  }
}
