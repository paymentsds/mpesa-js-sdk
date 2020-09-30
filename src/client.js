import { Service } from "./service.js";

export class Client {
  constructor(args) {
    this.service = new Service(args);
  }

  /**
   * Sends money to mobile or business wallet
   * @param {Object.<string, string>} data
   */
  send(data) {
    return this.service.handleSend(data);
  }

  /**
   * Receives money from a mobile wallet
   * @param {Object.<string, string>} data
   */
  receive(data) {
    return this.service.handleReceive(data);
  }

  /**
   * Reverts a successful transaction
   * @param {Object.<string, string>} data
   */
  revert(data) {
    return this.service.handleRevert(data);
  }

  /**
   * Queries the status of a given transaction
   * @param {Object.<string, string>} data
   */
  query(data) {
    return this.service.handleQuery(data);
  }
}
