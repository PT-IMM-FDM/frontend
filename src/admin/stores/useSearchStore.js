import { create } from "zustand";

const encode = (text) => btoa(text); // Encode ke Base64
const decode = (encodedText) => {
  try {
    return atob(encodedText); // Decode dari Base64
  } catch (error) {
    console.error("Decoding error:", error);
    return "";
  }
};

const useSearchStore = create((set) => {
  const storedQuery = localStorage.getItem("sq");
  const decodedQuery = storedQuery ? decode(storedQuery) : "";

  return {
    searchQuery: decodedQuery,
    setSearchQuery: (query) => {
      if (query === "") {
        localStorage.removeItem("sq");
      } else {
        localStorage.setItem("sq", encode(query));
      }
      set({ searchQuery: query });
    },
  };
});

export default useSearchStore;
