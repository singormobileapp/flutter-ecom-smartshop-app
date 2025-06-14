import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { useFavorites } from '@/context/FavoritesContext';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalImage, setModalImage] = useState<string | undefined>();

  const { items, updateQuantity, removeFromCart, getTotalPrice, addToCart } = useCart();
  const { favorites } = useFavorites();

  // Handle cart tab selection
  useEffect(() => {
    if (activeTab === 'cart') {
      setShowCart(true);
      setActiveTab('home'); // Reset to home to avoid staying on cart tab
    }
  }, [activeTab]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredProducts = products.filter(product => product.featured);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalImage(product.images?.[0]);
  };

  const renderHomeTab = () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4 px-4 md:px-0">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-0">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </section>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <section>
        <h2 className="text-xl font-bold mb-4 px-4 md:px-0">
          {selectedCategory === 'all' ? 'All Products' : selectedCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-0">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4 px-4 md:px-0">Your Favorites ({favorites.length})</h2>
        {favorites.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No favorite products yet</p>
            <p className="text-sm text-muted-foreground mt-2">Tap the heart icon on products to add them to your favorites</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-0">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );

  const renderProfileTab = () => (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Profile</h2>
      <div className="text-center text-muted-foreground">
        Sign in to view your profile and order history
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'search':
        return renderHomeTab();
      case 'favorites':
        return renderFavoritesTab();
      case 'profile':
        return renderProfileTab();
      default:
        return renderHomeTab();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}}
        onCartClick={() => setShowCart(true)}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto py-6 pb-20 md:pb-6">
        {renderContent()}
      </main>

      <div className="md:hidden">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Cart Drawer */}
      <Drawer open={showCart} onOpenChange={setShowCart}>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Shopping Cart ({items.length} items)</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      setShowCart(false);
                      navigate('/checkout');
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Drawer
          open={!!selectedProduct}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedProduct(null);
            }
          }}
        >
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>{selectedProduct.name}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4 overflow-y-auto">
              <img
                src={modalImage || "https://via.placeholder.com/300x200?text=Image+Unavailable"}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x200?text=Image+Unavailable")}
              />

              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-lg flex-shrink-0"
                      onClick={() => setModalImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                          modalImage === image ? 'border-primary' : 'border-transparent'
                        }`}
                        onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${selectedProduct.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{selectedProduct.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">⭐ {selectedProduct.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({selectedProduct.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart - ${selectedProduct.price}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Index;
