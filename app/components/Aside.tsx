import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { getCartItemCount } from '~/lib/inventory';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
  cart,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
  cart?: CartApiQueryFragment | null;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  
  // Get cart count for cart header
  const getCartHeading = () => {
    if (type === 'cart' && cart) {
      const itemCount = getCartItemCount(cart);
      return `Cart (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`;
    }
    return heading;
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
    >
      <button className="close-outside" onClick={close} />
      <aside className={`aside ${type === 'cart' ? 'cart-aside' : ''}`} data-type={type}>
        <header className="aside-header">
          <h3 className="aside-heading">{getCartHeading()}</h3>
          <button className="close reset" onClick={close} aria-label="Close">
            &times;
          </button>
        </header>
        <main className="aside-main">{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
