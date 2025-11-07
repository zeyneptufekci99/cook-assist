import { X } from 'lucide-react';
import { Badge as SDNBadge } from '../../ui/badge';
import type { IBadge } from './Badge.type';
import { Button } from '@/components/ui/button';

export const Badge = ({ label, onClose, isCloseActive, ...props }: IBadge) => {
  return (
    <SDNBadge {...props}>
      <div className="flex flex-row gap-2 items-center justify-center">
        {label}
        {isCloseActive && (
          <Button onClick={onClose} variant="ghost" className="p-0">
            <X size={16}></X>
          </Button>
        )}
      </div>
    </SDNBadge>
  );
};
