import { create } from 'zustand';
import { CartItem, Program } from '@types';

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  addToCart: (program: Program, quantity?: number) => void;
  removeFromCart: (programId: string) => void;
  updateQuantity: (programId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (programId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addToCart: (program, quantity = 1) => {
    const { items } = get();
    const existingItem = items.find(item => item.program.id === program.id);

    let newItems: CartItem[];
    if (existingItem) {
      newItems = items.map(item =>
        item.program.id === program.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [
        ...items,
        {
          id: `${program.id}-${Date.now()}`,
          program,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    }

    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce(
      (sum, item) => sum + item.program.price * item.quantity,
      0
    );

    set({ items: newItems, totalItems, totalPrice });
  },

  removeFromCart: (programId) => {
    const { items } = get();
    const newItems = items.filter(item => item.program.id !== programId);
    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce(
      (sum, item) => sum + item.program.price * item.quantity,
      0
    );

    set({ items: newItems, totalItems, totalPrice });
  },

  updateQuantity: (programId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeFromCart(programId);
      return;
    }

    const newItems = items.map(item =>
      item.program.id === programId
        ? { ...item, quantity }
        : item
    );

    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce(
      (sum, item) => sum + item.program.price * item.quantity,
      0
    );

    set({ items: newItems, totalItems, totalPrice });
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

  getCartItem: (programId) => {
    const { items } = get();
    return items.find(item => item.program.id === programId);
  },
}));
