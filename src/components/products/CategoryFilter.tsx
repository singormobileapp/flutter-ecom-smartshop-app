
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Category } from '@/types';
import { categories } from '@/data/mockData';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full">
      <h3 className="font-semibold mb-3 px-4 md:px-0">Categories</h3>
      <ScrollArea className="w-full">
        <div className="flex gap-2 px-4 md:px-0 pb-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => onCategoryChange('all')}
            className="whitespace-nowrap"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => onCategoryChange(category.name)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
