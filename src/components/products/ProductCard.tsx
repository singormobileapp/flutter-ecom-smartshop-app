
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isProductFavorite = isFavorite(product.id);

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            Featured
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            -{discountPercentage}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleFavorite}
          className={`absolute bottom-2 right-2 h-8 w-8 rounded-full ${
            isProductFavorite ? 'text-red-500' : 'text-muted-foreground'
          }`}
        >
          <Heart className={`h-4 w-4 ${isProductFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground ml-1">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
}
