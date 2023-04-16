import { SayHellDto } from "../../dtos";

export class SayHelloQuery {
  constructor(public readonly sayHelloDto: SayHellDto) {
  }
}