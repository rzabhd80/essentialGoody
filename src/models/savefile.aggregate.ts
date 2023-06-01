import { AggregateRoot } from "@nestjs/cqrs";

export class SaveFileAggregate extends AggregateRoot {
  constructor() {
    super();
  }
}
