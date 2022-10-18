import { appSchema } from "@nozbe/watermelondb/Schema";
import { carSchema } from "./carSchema";

import { userSchema } from "./userSchema";

export const schemas = appSchema({
    version: 2,
    tables: [
        userSchema,
        carSchema
    ]
});