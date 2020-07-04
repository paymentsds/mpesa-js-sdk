import axios from "axios";
import { Service } from "./service.js";

export class Client {
  constructor(args) {
    this.service = new Service(args);
  }

  send(data) {
    this.service.handleSend(data);
  }

  receive(data) {
    this.service.handleReceive(data);
  }

  revert(data) {
    this.service.handleRevert(data);
  }

  query(data) {
    this.service.handleQuery(data);
  }
}
