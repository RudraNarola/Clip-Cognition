import { title } from "process";
import * as z from "zod";

export const VideoValidation = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(500),
  tags: z.array(z.string()).max(15),
});
