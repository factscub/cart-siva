import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Buy from "../../components/Buy";
import DropDown from "../../components/DropDown";
import Table from "../../components/Table";
import { homeTable } from "../../constant/columns";
import getBrands from "../../helpers/getBrands";
import getCategories from "../../helpers/getCategories";
import useDebounce from "../../hooks/useDebounce";
import useFilterTable from "../../hooks/useFilterTable";
import useProducts from "../../hooks/useProducts";
import useSearch from "../../hooks/useSearch";
import Pagination from "react-js-pagination";

const Home = () => {
  const columns = useMemo(homeTable, [homeTable]);
  const [filteredData, setFilteredData] = useState([]);

  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>();
  const [brand, setbrand] = useState<string | undefined>();

  const str = useDebounce(text);
  const { data, fetchProductsData } = useProducts();
  const search = useSearch();
  const filterTable = useFilterTable();

  const brands = useMemo(() => getBrands(data, category), [data, category]);
  const categories = useMemo(() => getCategories(data), [data]);

  /* _________handlers__________ */

  const handlePageClick = (n: number): void => {
    setPage(n);
    setText("");
    setCategory(undefined);
    setbrand(undefined);
    setFilteredData([]);
  };

  const onChangeCategory = (i: string): void => {
    setCategory(i);
    setText("");
    setbrand(undefined);
  };
  const onChangeBrand = (i: string): void => {
    setbrand(i);
    setText("");
  };

  const onReset = (): void => {
    setbrand(undefined);
    setCategory(undefined);
    setText("");
  };

  /* ________useeffect section_________ */

  useEffect((): void => {
    fetchProductsData({ page });
  }, [fetchProductsData, page]);

  useEffect((): void => {
    if (str && data) {
      const products = search(data.products, str);
      setFilteredData(products);
      setCategory(undefined);
      setbrand(undefined);
    } else {
      if (data) {
        const filteredData = filterTable(data.products, brand, category);
        setFilteredData(filteredData);
      }
    }
  }, [str, data, search, filterTable, brand, category]);

  return (
    <>
      {/* _______________header________________ */}
      <Header>
        <LeftSection>
          <DropDown
            options={categories}
            onChange={onChangeCategory}
            placeholder={category ? category : "categories"}
            disabled={false}
          />
          <DropDown
            options={brands}
            onChange={onChangeBrand}
            placeholder={brand ? brand : "brands"}
            disabled={category ? false : true}
          />
          <ResetButton onClick={onReset}>
            <h2>&#8630;</h2> reset
          </ResetButton>
        </LeftSection>
        <RightSection>
          <label>
            search:
            <input
              type={"text"}
              value={text}
              onChange={(e) => setText(e.target.value.trim())}
            />
          </label>

          <CartButton>
            <Link to={"cart"}>Add To Cart</Link>
          </CartButton>
        </RightSection>
      </Header>

      {/* _______________Table________________ */}
      {!!filteredData.length && (
        <>
          <TableWrapper>
            {" "}
            <Table columns={columns}>
              <tbody>
                {filteredData.map((product: any) => (
                  <tr key={product.id}>
                    <td>
                      <Image>
                        <img src={product.thumbnail} alt="img" />
                      </Image>
                    </td>
                    <td className="title">{product.title}</td>
                    <td className="rating">{product.rating}</td>
                    <td style={{ color: product.stock > 0 ? "green" : "red" }}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </td>
                    <td>${product.price}</td>
                    <td>
                      <Buy product={product} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          {/* _________pagination__________ */}
          <Pagination
            itemsCountPerPage={10}
            pageRangeDisplayed={5}
            totalItemsCount={data ? data.total : 0}
            activePage={page}
            onChange={handlePageClick}
          />
        </>
      )}
    </>
  );
};

export default Home;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  padding: 0 10px;
  margin: 10px 0;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  margin: 7px 0;
  display: flex;
  align-items: center;
`;

const ResetButton = styled.button`
  border: 2px solid grey;
  cursor: pointer;
  color: rgb(0, 204, 255);
  font-weight: 600;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.span`
  img {
    border-radius: 5px;
    max-height: 60px;
    max-width: 100px;
  }
`;

const CartButton = styled.p`
  display: flex;
  a {
    margin-left: 15px;
    padding: 10px 15px;
    background: rgb(0, 204, 255);
  }
`;
