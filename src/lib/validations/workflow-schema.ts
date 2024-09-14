import { z } from "zod";

export const workflowSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters length." }),
  desc: z.string().min(3, { message: "Minimum 3 characters length." })
})