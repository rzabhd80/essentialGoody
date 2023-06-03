import { CreateSupplierHandler } from "./create-supplier.handler";
import { UpdateSupplierHandler } from "./update-supplier.handler";
import { DeleteSupplierHandler } from "./delete-supplier.handler";

export const commandsHandlers = [CreateSupplierHandler, UpdateSupplierHandler, DeleteSupplierHandler];
