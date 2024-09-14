import { z } from "zod";

export const userUpdateSchema = z.object({
  file: z.string(),
  name:
    z.string().min(3, { message: "Minimum 3 characters length." }).
      max(150, { message: "Maximum 150 characters length." }),
  email: z.string()
})