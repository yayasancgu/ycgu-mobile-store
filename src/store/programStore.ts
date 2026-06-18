import { create } from 'zustand';
import { Program, Category } from '@types';

interface ProgramStore {
  programs: Program[];
  categories: Category[];
  filteredPrograms: Program[];
  selectedCategory: string | null;
  searchQuery: string;
  
  setPrograms: (programs: Program[]) => void;
  setCategories: (categories: Category[]) => void;
  filterByCategory: (categoryId: string) => void;
  search: (query: string) => void;
  addProgram: (program: Program) => void;
  updateProgram: (id: string, program: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
  getProgram: (id: string) => Program | undefined;
}

export const useProgramStore = create<ProgramStore>((set, get) => ({
  programs: [],
  categories: [],
  filteredPrograms: [],
  selectedCategory: null,
  searchQuery: '',

  setPrograms: (programs) => set({ programs, filteredPrograms: programs }),
  
  setCategories: (categories) => set({ categories }),

  filterByCategory: (categoryId) => {
    const { programs } = get();
    set({ selectedCategory: categoryId });
    
    if (categoryId === 'all') {
      set({ filteredPrograms: programs });
    } else {
      set({ 
        filteredPrograms: programs.filter(p => p.category === categoryId) 
      });
    }
  },

  search: (query) => {
    const { programs, selectedCategory } = get();
    set({ searchQuery: query });
    
    let filtered = programs.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    set({ filteredPrograms: filtered });
  },

  addProgram: (program) => {
    const { programs } = get();
    set({ 
      programs: [program, ...programs],
      filteredPrograms: [program, ...programs]
    });
  },

  updateProgram: (id, updates) => {
    const { programs } = get();
    const updated = programs.map(p => p.id === id ? { ...p, ...updates } : p);
    set({ programs: updated, filteredPrograms: updated });
  },

  deleteProgram: (id) => {
    const { programs } = get();
    const filtered = programs.filter(p => p.id !== id);
    set({ programs: filtered, filteredPrograms: filtered });
  },

  getProgram: (id) => {
    const { programs } = get();
    return programs.find(p => p.id === id);
  },
}));
