import React from 'react';

export default function ReusableTable({
  columns,
  data,
  onEdit,
  onDelete,
  onSort,
  sortKey,
  order,
  page,
  setPage,
  total,
  limit = 5
}) {
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>

              {columns.map((col) => (
                <th
                  key={col.accessor}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSort(col.accessor)}
                >
                  {col.header}
                  {sortKey === col.accessor && (
                    <span> {order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center">
                  No Data Available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id}>
                  <td>{(page - 1) * limit + index + 1}</td>

                  {columns.map((col) => (
                    <td key={col.accessor}>
                      {row[col.accessor]}
                    </td>
                  ))}

                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-secondary btn-sm me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages || 1}
        </span>

        <button
          className="btn btn-secondary btn-sm ms-2"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}