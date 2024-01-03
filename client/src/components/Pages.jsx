import { useContext } from "react";
import { observer } from "mobx-react-lite";

import Pagination from "react-bootstrap/Pagination";

import { Context } from "..";

export const Pages = observer(() => {
  const { movie } = useContext(Context);
  const pageCount = Math.ceil(movie.totalCount / movie.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={movie.page === page}
          onClick={() => movie.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});
