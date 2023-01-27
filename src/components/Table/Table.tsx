const Table = ({ columns, children }: any) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column: any, i: number) => (
            <th
              key={i}
              className={
                column.Header.toLowerCase() === "product"
                  ? "product"
                  : column.Header.toLowerCase() === "name"
                  ? "name"
                  : ""
              }
            >
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
