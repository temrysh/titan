import { create } from "zustand";

export interface Content {
  id: number;
  title: string;
  original_title: string;
  year: number;
  synopsis: string;
  images: {
    artwork_portrait: string;
  };
}

interface ContentsState {
  contents: Content[];
  isLoading: boolean;
  error: string | null;
  fetchContents: () => Promise<void>;
}

export const useContents = create<ContentsState>((set) => ({
  contents: [],
  isLoading: true,
  error: null,
  fetchContents: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetch(
        "https://acc01.titanos.tv/v1/genres/14/contents?market=es&device=tv&locale=es&page=1&per_page=50"
      ).then((res) => res.json());

      set({ contents: data.collection, isLoading: false });
    } catch (error) {
      console.error("Error fetching contents:", error);
      set({ error: "Failed to fetch contents", isLoading: false });
    }
  },
}));

// initialize the store by fetching contents
useContents.getState().fetchContents();
