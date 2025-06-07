import type { CategoryId } from '@/types';
import { getCategoryById } from '@/lib/mockData'; // Assuming categories are defined here
import { Package } from 'lucide-react'; // Default icon

interface CategoryIconProps {
  categoryId: CategoryId;
  className?: string;
}

export function CategoryIcon({ categoryId, className }: CategoryIconProps) {
  const category = getCategoryById(categoryId);
  const IconComponent = category?.icon || Package;
  return <IconComponent className={className || "h-5 w-5"} aria-label={category?.name || categoryId} />;
}
