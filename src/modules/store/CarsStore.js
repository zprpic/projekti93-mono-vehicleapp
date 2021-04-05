import { makeAutoObservable } from "mobx";

import {
  filterCarsByName,
  sortCarsByNameAsc,
  sortCarsByNameDesc,
} from "../footer/utils/utils";

import Data from "../data/Data";

class CarsStore {
  constructor() {
    this.data = [...Data]; // Proxy data, source of truth for filtered data
    this.sortedAZ = false;
    this.searchTerm = null;
    this.currentPage = 1;
    this.carsPerPage = 5;
    makeAutoObservable(
      this
      // Auto already does this, this is not needed
      // {
      // data: observable,
      // totalItems: observable,
      // handleSubmit: action,
      //
      // sortedAZ: observable,
      // sortData: action,
      //
      // searchTerm: observable,
      // search: action,
      //
      // currentPage: observable,
      // carsPerPage: observable,
      // paginate: action,
      // paginateCarList: action,
      // }
    );
  }

  // Paginated data after data is filtered
  get paginatedData() {
    const indexOfLastCar = this.currentPage * this.carsPerPage;
    const indexOfFirstCar = indexOfLastCar - this.carsPerPage;
    return this.data.slice(indexOfFirstCar, indexOfLastCar);
  }

  handleSubmit(carName, carModel) {
    const newCarId = Data.length;
    const newCar = {
      name: carName,
      model: carModel,
      id: newCarId,
    };
    Data.unshift(newCar);
    this.searchTerm = null;
    this.paginate(1);
    this.search("");
  }

  sortData() {
    const sortingFunction =
      this.sortedAZ === false ? sortCarsByNameAsc : sortCarsByNameDesc;
    this.data = this.data.sort(sortingFunction);
    this.sortedAZ = !this.sortedAZ;
  }

  search(searchTerm) {
    this.data = filterCarsByName(Data, searchTerm);
    this.searchTerm = searchTerm;
    const newPageLength = Math.ceil(this.data.length / this.carsPerPage);
    this.currentPage = Math.min(newPageLength, this.currentPage);
  }
  paginate(pageNumber) {
    this.data = filterCarsByName(Data, this.searchTerm);
    this.currentPage = pageNumber;
  }

  // Get the correct page numbering using total length / carsPerPage and ceil up
  get pageNumbers() {
    return new Array(Math.ceil(this.data.length / this.carsPerPage))
      .fill(0)
      .map((_, idx) => idx + 1);
  }
}

const store = new CarsStore();

export { store };
