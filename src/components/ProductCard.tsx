import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>
      <h3 className="font-display font-semibold text-lg mb-1">{node.title}</h3>
      <p className="text-muted-foreground text-sm mb-3">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={handleAddToCart}
        disabled={isLoading || !variant?.availableForSale}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-2" />Add to Cart</>}
      </Button>
    </Link>
  );
};
