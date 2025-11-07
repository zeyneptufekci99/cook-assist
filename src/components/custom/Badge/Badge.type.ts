import type { BadgeProps } from '@/components/ui/badge';

export interface IBadge extends BadgeProps {
  label: string;
  isCloseActive?: boolean;
  onClose?: () => void;
}
