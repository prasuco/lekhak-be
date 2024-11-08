import { z } from "zod";

const CreateOrgSchema = z.object({ name: z.string() });

export default CreateOrgSchema;
