import React from "react";
import Item from "./components/Item";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { observer } from "mobx-react";

const FilterableVehicleTable = observer(({ store }) => {
  // This is for getting the correct pagination after filtering
  const dataList = store.paginatedData.map((item) => {
    return <Item name={item.name} model={item.model} key={item.id} />;
  });

  let sortButtonText = store.sortedAZ === false ? "A-Z" : "Z-A";

  const pages = () => store.pageNumbers; // Make sure not to get un-bind
  const paginate = (num) => store.paginate(num);

  return (
    <>
      <Header onCarAdded={store.handleSubmit.bind(store)} />
      <main className="main">{dataList}</main>
      <Footer
        isSorted={sortButtonText}
        onListSorted={() => store.sortData()}
        onSearch={(searchTerm) => store.search(searchTerm)}
        pages={pages}
        paginate={paginate}
      />
    </>
  );
});

export default FilterableVehicleTable;
