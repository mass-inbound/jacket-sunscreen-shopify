import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { OptimisticCart } from '@shopify/hydrogen';

/**
 * Get the available quantity for a product variant
 * This uses the quantityAvailable field from Shopify's inventory tracking
 */
export function getAvailableQuantity(variant: any): number {
  // If you have inventory tracking enabled, you can access it via:
  // variant.quantityAvailable or variant.inventoryQuantity
  if (!variant?.availableForSale) {
    return 0;
  }
  
  // Use the actual quantity available from Shopify
  // If quantityAvailable is null, it means inventory tracking is not enabled
  // In that case, we'll use a default high number
  if (variant.quantityAvailable !== null && variant.quantityAvailable !== undefined) {
    return variant.quantityAvailable;
  }
  
  // Default to a high number if no specific inventory tracking
  return 999;
}

/**
 * Get the current quantity of a variant in the cart
 */
export function getCartQuantity(cart: CartApiQueryFragment | OptimisticCart<CartApiQueryFragment> | null, variantId: string): number {
  if (!cart?.lines?.nodes) return 0;
  
  const line = cart.lines.nodes.find(
    (line) => line.merchandise?.id === variantId
  );
  
  return line?.quantity || 0;
}

/**
 * Check if adding a quantity would exceed available inventory
 */
export function canAddToCart(
  cart: CartApiQueryFragment | OptimisticCart<CartApiQueryFragment> | null,
  variantId: string,
  quantityToAdd: number,
  variant: any
): boolean {
  const availableQuantity = getAvailableQuantity(variant);
  const currentCartQuantity = getCartQuantity(cart, variantId);
  
  return (currentCartQuantity + quantityToAdd) <= availableQuantity;
}

/**
 * Get the maximum quantity that can be added to cart
 */
export function getMaxAddableQuantity(
  cart: CartApiQueryFragment | OptimisticCart<CartApiQueryFragment> | null,
  variantId: string,
  variant: any
): number {
  const availableQuantity = getAvailableQuantity(variant);
  const currentCartQuantity = getCartQuantity(cart, variantId);
  
  return Math.max(0, availableQuantity - currentCartQuantity);
}

/**
 * Get the number of unique products in the cart (not total quantity)
 */
export function getCartItemCount(cart: CartApiQueryFragment | OptimisticCart<CartApiQueryFragment> | null): number {
  if (!cart?.lines?.nodes) return 0;
  return cart.lines.nodes.length;
}

/**
 * Get the total quantity of all items in the cart
 */
export function getCartTotalQuantity(cart: CartApiQueryFragment | OptimisticCart<CartApiQueryFragment> | null): number {
  return cart?.totalQuantity || 0;
} 