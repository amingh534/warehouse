import { useGetAllProducts } from "../services/queries";

import "react-toastify/dist/ReactToastify.css";
import AddProductForm from "../components/AddProductForm";
import ProductsCard from "../components/ProductsCard";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

function ProductsDetailsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, error, isPending } = useGetAllProducts(page, debouncedSearch);

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>Something went wrong!</p>;

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    event.target.value.length > 2 && setPage(1);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  

  return (
    <div>
      <h4>Products:</h4>
      <input
        type="text"
        spellCheck="false"
        value={search || ""}
        onChange={handleSearchChange}
        placeholder="Search Products"
        autoFocus
      />
      <p>Search Term:{data?.searchTerm}</p>
      <p>Extracted Number:{data?.extractedNumber}</p>
      <ul>
        {data?.data?.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </ul>
      <div>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>Page{page}</span>
        
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
      <AddProductForm />
    </div>
  );
}

export default ProductsDetailsPage;
