import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

const CollectionsPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(20).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
        <p className="text-muted-foreground max-w-md mx-auto">Every blend, every accessory — crafted for the modern professional.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-secondary/30 rounded-2xl">
          <p className="text-muted-foreground text-lg mb-2">No products found</p>
          <p className="text-sm text-muted-foreground">Tell the chat what products you'd like to add!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
