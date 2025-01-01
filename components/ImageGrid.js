import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import ImageGridCard from "./ImageGridCard";

const ImageGrid = ({ searchQuery, searchType = "visual" }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Mock data generator for different search types
  const generateMockResults = (pageNum, type) => {
    return Array.from({ length: 12 }, (_, i) => {
      const id = (pageNum - 1) * 12 + i;
      
      // Base result object
      const baseResult = {
        id,
        imageUrl: `/demon-slayer.jpg`,
        timestamp: new Date(Date.now() - id * 86400000).toLocaleDateString(),
      };

      // Add type-specific fields
      switch (type) {
        case "shopping":
          return {
            ...baseResult,
            type: "shopping",
            title: `Product ${id + 1}`,
            price: `$${(19.99 + id).toFixed(2)}`,
            merchant: `Store ${(id % 5) + 1}`,
            availability: id % 3 === 0 ? "In Stock" : "Limited Stock",
            rating: ((3 + (id % 2)) + Math.random()).toFixed(1),
            reviews: (50 + id * 3),
            freeShipping: id % 2 === 0,
          };
        
        case "similar":
          return {
            ...baseResult,
            type: "similar",
            title: `Similar Image ${id + 1}`,
            sourceWebsite: `website${id}.com`,
            dimensions: `${800 + (id * 10)}x${600 + (id * 10)}`,
            fileSize: `${(200 + id * 50)}KB`,
            format: id % 2 === 0 ? "JPG" : "PNG",
          };
        
        case "text":
          return {
            ...baseResult,
            type: "text",
            detectedText: `Sample Text ${id + 1}`,
            confidence: `${85 + (id % 10)}%`,
            language: ["English", "Japanese", "Spanish"][id % 3],
          };

        default:
          return {
            ...baseResult,
            type: "visual",
            title: `Visual Result ${id + 1}`,
            sourceUrl: `https://example${id}.com`,
            relevanceScore: (0.5 + Math.random() * 0.5).toFixed(2),
            category: ["Art", "Photo", "Screenshot", "Illustration"][id % 4],
          };
      }
    });
  };

  const fetchResults = async (pageNum) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newResults = generateMockResults(pageNum, searchType);
      setResults((prev) => [...prev, ...newResults]);
      setHasMore(pageNum < 5); // Limit to 5 pages for demo
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset results when search type changes
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchResults(1);
  }, [searchType, searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
          fetchResults(page + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading, page]);

  return (
    <div className="flex relative flex-col flex-grow bg-white">
      <div className="flex flex-col flex-auto m-6">
        <div className="flex flex-col flex-grow mb-4">
          <div className="grid gap-3 mx-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {results.map((result) => (
              <ImageGridCard
                key={result.id}
                image={result.imageUrl}
                title={result.title}
                price={result.price}
                description={result.description}
                merchant={result.merchant}
                sourceUrl={result.sourceUrl}
                metadata={result}
                type={result.type}
                icon={result.icon}
              />
            ))}
          </div>
          {searchType === "shopping" && (
            <div className="font-roboto text-xs tracking-[0.025em] font-normal text-[rgb(95,99,104)] leading-4 mt-3 pb-2 text-center">
              *Check website for latest pricing and availability.
            </div>
          )}
        </div>
        <a className="font-googleSans text-[.75rem] tracking-[.1px] text-[rgb(95,99,104)] font-medium leading-4 line-clamp-2 overflow-hidden break-words flex items-center justify-center m-2">
          <img src="/icons/questionMark.svg" alt="Support icon" />
          <span className="ml-2">Support</span>
        </a>
      </div>

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center items-center p-4 mt-4">
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Loading more results...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && (
        <p className="text-center mt-4 text-gray-500">No more results to load</p>
      )}
    </div>
  );
};

export default ImageGrid;