import { Service } from "./service.js";

export class Client {
  constructor(args) {
    this.service = new Service(args);
  }

  send(data) {
    return this.service.handleSend(data);
  }

  receive(data) {
    return this.service.handleReceive(data);
  }

  revert(data) {
    return this.service.handleRevert(data);
  }

  query(data) {
    return this.service.handleQuery(data);
  }
}
