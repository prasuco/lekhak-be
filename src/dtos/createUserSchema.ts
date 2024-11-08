import { z } from "zod";
const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export default CreateUserSchema;
