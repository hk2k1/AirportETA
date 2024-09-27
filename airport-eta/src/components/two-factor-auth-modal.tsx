import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden">
        <div className="bg-white p-6">
            <Image src="/microsoft-logo.png" alt="Microsoft" width={124} height={124} />
            {/* <img src="/microsoft-logo.png" alt="Microsoft" className="h-6" /> */}
            <h1 className="text-2xl font-semibold mb-4">Enter code</h1>
            <p className="text-sm text-gray-600 mb-4">
              Please type in the code displayed on your authenticator app from your device
            </p>
            <Input
                id="twoFactorCode"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-2xl text-center tracking-widest"
                maxLength={6}
            />
            <div className="flex items-center mb-4 mt-4">
                <Checkbox
                id="rememberDevice"
                checked={rememberDevice}
                onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
                className="border-2 border-gray-600"
                />
                <label htmlFor="rememberDevice" className="ml-2 text-sm text-gray-700">
                Don&apos;t ask me again on this device
                </label>
          </div>
            <Button onClick={handleVerify} disabled={isVerifying || code.length !== 6} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isVerifying ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </Button>
            <div className="mt-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">Having trouble? Sign in another way</a>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};