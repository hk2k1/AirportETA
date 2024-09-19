import * as z from "zod"

export const userAuthSchema =  z.object({
    email: z.string().email({ message: "Enter a valid email adress" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})