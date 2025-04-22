import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface Product {
  id: number;
  name: string;
}

const SearchBarWithPopup: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Replace this with your API data
  const products: Product[] = [
    { id: 1, name: "Gold Ring" },
    { id: 2, name: "Silver Necklace" },
    { id: 3, name: "Couple Band" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
    { id: 4, name: "Diamond Earrings" },
  ];

  useEffect(() => {
    if (query.trim()) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-[400px] ml-[170px] max-md:ml-0 max-md:w-full"
      ref={dropdownRef}
    >
      <Search className="absolute left-1 ml-2.5 w-5 h-5 top-6 max-md:top-7 transform -translate-y-1/2 text-[#7B48A5]" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className=" mt-1 pl-10 pr-2 w-full h-[40px] max-md:h-[45px] rounded-md border border-[#7B48A5] pt-1 outline-none ring-2 ring-[#d3b6e9] text-gray"
        onFocus={() => query && setShowDropdown(true)}
      />

      {showDropdown && (
        <div className="absolute z-50 mt-1 bg-white shadow-2xl max-md:shadow-none rounded-xl w-full max-h-[200px] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="px-4 py-2 hover:bg-[#f5e8ff] cursor-pointer text-sm text-gray-700"
                onClick={() => {
                  console.log("Selected:", product);
                  setQuery(product.name);
                  setShowDropdown(false);
                }}
              >
                {product.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithPopup;
