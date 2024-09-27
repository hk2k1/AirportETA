// src/components/AuthForms/user-auth-form.tsx
"use client"

import * as React from "react"
// import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { emailLogin } from "@/lib/actions/action";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { userAuthSchema } from "@/lib/validations/auth"
import toast from "react-hot-toast"
// import { useTransition } from "react"
// import OAuthSignIn from "./oauth-signin"

import { TwoFactorAuthModal } from "@/components/two-factor-auth-modal"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type UserFormValue = z.infer<typeof userAuthSchema>;

// const oAuthProviders = [
//   {
//     name: 'github' as const,
//     displayName: 'GitHub',
//     icon: 'gitHub' as keyof typeof Icons
//   },
//   {
//     name: 'google' as const,
//     displayName: 'Google',
//     icon: 'google' as keyof typeof Icons
//   },
//   {
//     name: 'keycloak' as const,
//     displayName: 'Keycloak',
//     icon: 'sso' as keyof typeof Icons,
//     options: {
//       scopes: 'openid',
//     }
//   }
//   // Add more providers here as needed
// ];

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValue>({
    resolver: zodResolver(userAuthSchema),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<boolean>(false)
  // const [isPending, startTransition] = useTransition();

  // const onSubmit = async (values: UserFormValue) => {
  //   setIsLoading(true)
  //   // console.log("values", values)
  //   emailLogin(values).then((data: string | { error: string }) => {
  //     if (typeof data === "object" && "error" in data) {
  //       toast.error(data.error);
  //       return;
  //     }
  //     toast.success("logged in");
  //   });
  //   setIsLoading(false)
  // }

  const [showTwoFactor, setShowTwoFactor] = React.useState<boolean>(false)
  const router = useRouter()
  
  const onSubmit = async (values: UserFormValue) => {
    setIsLoading(true)
    const result = await emailLogin(values);
    if ('error' in result) {
      toast.error(result.error || "An unknown error occurred");
    } else if (result.success && result.requiresTwoFactor) {
      setShowTwoFactor(true);
    }
    setIsLoading(false)
  }

  const handleTwoFactorClose = () => {
    setShowTwoFactor(false);
    toast.success("Logged in successfully");
    router.push("/dashboard");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isOAuthLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
            <Label className="sr-only" htmlFor="password">
            </Label>
            <Input 
              id="password" 
              placeholder="Password" 
              type="password" 
              autoComplete="current-password" 
              {...register("password")}
              />
              {errors?.password && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <TwoFactorAuthModal isOpen={showTwoFactor} onClose={handleTwoFactorClose} />
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className={cn(
        "grid gap-2",
        oAuthProviders.length === 1 ? "grid-cols-1" : 
        oAuthProviders.length === 2 ? "grid-cols-2" : 
        "grid-cols-2 sm:grid-cols-3"
      )}>
        {oAuthProviders.map((provider) => (
          <OAuthSignIn
            key={provider.name}
            provider={provider}
            options={provider.options}
            isLoading={isOAuthLoading}
            setIsLoading={setIsOAuthLoading}
            className="w-full"
          />
        ))}
      </div> */}
    </div>
  )
}