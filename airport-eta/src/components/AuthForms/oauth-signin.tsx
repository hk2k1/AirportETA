import React from 'react';
import { Button } from '@/components/ui/button';
import { oAuthSignIn } from '@/lib/actions/action';
import { type Provider } from '@supabase/supabase-js';
import { Icons } from '@/components/icons';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon: keyof typeof Icons;
};

interface OAuthSignInProps {
  provider: OAuthProvider;
  options?: Record<string, string>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const OAuthSignIn: React.FC<OAuthSignInProps> = ({ 
  provider,
  options, 
  isLoading, 
  setIsLoading, 
  className 
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await oAuthSignIn(provider.name, options || {});
    setIsLoading(false);
  };

  const Icon = Icons[provider.icon];

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <Button
        type="submit"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full flex items-center justify-center"
        )}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icon className="mr-2 h-4 w-4" />
        )}
        <span>{provider.displayName}</span>
      </Button>
    </form>
  );
};

export default OAuthSignIn;