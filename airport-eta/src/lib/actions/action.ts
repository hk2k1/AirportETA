// src/lib/actions/action.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { userAuthSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { headers } from "next/headers";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helper";

// export const emailLogin = async (values: z.infer<typeof userAuthSchema>) => {
//   const validatedData = userAuthSchema.safeParse(values);
//   if (!validatedData.success) {
//     return { error: "Invalid Fields!" };
//   }
//   const {email, password } = validatedData.data;
//   const supabase = createClient();

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return {error: error.message};
//     // return encodedRedirect("error", "/login", error.message);
//     // return encodedRedirect("error", "/sign-in", error.message);
//   }
  
//   return redirect("/dashboard");
// };

export const emailLogin = async (values: z.infer<typeof userAuthSchema>) => {
  const validatedData = userAuthSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validatedData.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  
  // Instead of redirecting immediately, return a success status
  return { success: true, requiresTwoFactor: true };
};

export const signup = async (values: z.infer<typeof userAuthSchema>) => {
  const validatedData = userAuthSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }
  const {email, password } = validatedData.data;
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

// console.log("email", email);
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {error: error.message};
    // return encodedRedirect("error", "/login", error.message);
    // return encodedRedirect("error", "/sign-in", error.message);
  }
  
  return redirect("/login");
};

export async function getAuthUser() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function oAuthSignIn(provider: Provider, options: Record<string, string>) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }

  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback")
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
          scopes: options.scopes,
          redirectTo: redirectUrl,
      }
  })

  if (error) {
      redirect('/login?message=Could not authenticate user')
  }
  console.log(data)

  return redirect(data.url)
}