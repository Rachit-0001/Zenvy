import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Shield, Truck, RotateCcw, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (handle) {
      fetchProductByHandle(handle).then(p => { setProduct(p); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [handle]);

  if (loading) return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-3/4" /><div className="h-6 bg-muted rounded w-1/4" /><div className="h-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-muted-foreground text-lg">Product not found</p>
      <Link to="/collections"><Button variant="outline" className="mt-4 rounded-full">Back to Shop</Button></Link>
    </div>
  );

  const images = product.images.edges;
  const variant = product.variants.edges[selectedVariantIdx]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/collections" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
            {images[selectedImage]?.node && (
              <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-accent' : 'border-transparent'}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{product.title}</h1>
          <p className="text-2xl font-semibold mb-6">
            {variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Variant Selection */}
          {product.options.length > 0 && product.options[0].name !== "Title" && (
            <div className="mb-8">
              {product.options.map((option) => (
                <div key={option.name} className="mb-4">
                  <label className="text-sm font-semibold mb-2 block">{option.name}</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.variants.edges.map((v, idx) => (
                      <button
                        key={v.node.id}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${idx === selectedVariantIdx ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-secondary'}`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button size="lg" className="w-full rounded-full mb-8 text-base" onClick={handleAddToCart} disabled={isCartLoading || !variant?.availableForSale}>
            {isCartLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart</>}
          </Button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t">
            {[
              { icon: Shield, label: "Secure Payment" },
              { icon: Truck, label: "Fast Delivery" },
              { icon: RotateCcw, label: "30-Day Returns" },
            ].map((badge) => (
              <div key={badge.label} className="text-center">
                <badge.icon className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
