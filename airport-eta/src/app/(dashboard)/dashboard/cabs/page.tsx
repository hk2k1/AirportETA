"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { redirect } from "next/navigation"

const SSOSimulation: React.FC = () => {
  const [authState, setAuthState] = useState<'initial' | 'authenticating' | 'authenticated' | 'redirecting'>('initial');
  const [countdown, setCountdown] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (authState === 'authenticating') {
      timer = setTimeout(() => setAuthState('authenticated'), 2000);
    } else if (authState === 'authenticated') {
      timer = setTimeout(() => setAuthState('redirecting'), 1000);
    } else if (authState === 'redirecting') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsOpen(false);
            setAuthState('initial');
            redirect("/dashboard")
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authState]);

  const handleSSO = () => {
    setAuthState('authenticating');
    setIsOpen(true);
  };

  return (
    <Card className="w-96 mx-auto mt-10">
      <CardContent className="pt-6">
        <Button onClick={handleSSO} className="w-full">
          Initiate SSO
        </Button>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>SSO Authentication</AlertDialogTitle>
              <AlertDialogDescription>
                {authState === 'authenticating' && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                    Authenticating user...
                  </div>
                )}
                {authState === 'authenticated' && (
                  <div className="text-center text-green-600">
                    User Authenticated
                  </div>
                )}
                {authState === 'redirecting' && (
                  <div className="text-center">
                    Redirecting in {countdown} seconds...
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default SSOSimulation;