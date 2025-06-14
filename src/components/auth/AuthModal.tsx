
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 border-0">
        {isLogin ? (
          <LoginForm
            onToggleMode={() => setIsLogin(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <SignupForm
            onToggleMode={() => setIsLogin(true)}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
