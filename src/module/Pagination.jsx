import React, { useState } from "react";

function Pagination() {
  const [page, setPage] = useState(1);

  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const nextHandler = () => {
    if (page >= 3) return;
    setPage((page) => page + 1);
  };
  return (
    <div>
      
    </div>
  );
}

export default Pagination;
