import { useState } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { usePagination, useSortBy, useTable } from "react-table";
import { BsSearch } from "react-icons/bs";

function TableHOC({
  columns,
  containerClassName = "",
  data,
  heading,
  pageSize = 4,
  showPagination = false,
  showSearch = false,
  onSearch,
}) {

  return function HOC() {
    const options = {
      columns,
      data,
      initialState: {
        pageSize,
      },
    };
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      nextPage,
      previousPage,
      state: { pageIndex },
      pageCount,
      canNextPage,
      canPreviousPage,
      gotoPage,
    } = useTable(options, useSortBy, usePagination);
    const [pageInput, setPageInput] = useState(pageIndex + 1);

    return (
      <div className={containerClassName}>
        <h2 className="table-header">
          <span>{heading}</span>

          {showSearch&&(<p className="table-search">
            <input type="text" placeholder="Search..." id="tableSearch" />
            <button
              onClick={onSearch}
              className="text-xl flex items-center p-2"
            >
              <BsSearch style={{ display: "inline" }} />
            </button>
          </p>)}
        </h2>

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>
                        {column.isSortedDesc ? (
                          <FaSortAmountDown
                            style={{ display: "inline", marginLeft: "0.3rem" }}
                          />
                        ) : (
                          <FaSortAmountDownAlt
                            style={{ display: "inline", marginLeft: "0.3rem" }}
                          />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && pageCount > 1 && (
          <div>
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>
              {pageIndex + 1} of {pageCount}
            </span>

            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
            <button
              disabled={!pageCount > 1}
              onClick={() => gotoPage(pageInput - 1)}
            >
              Goto Pg{" "}
            </button>
            <input
              disabled={!pageCount > 1}
              className=""
              type="number"
              min={1}
              max={pageCount}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
