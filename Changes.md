# Changes to revert to the correct state

### Modified Package-lock.json, because I need to npm install
### Modified CarsStore.js
[`CarsStore`](/src/modules/store/CarsStore.js)
> 1. Make `this.data` into a filtered Data but not paginated yet
> 2. Updated `this.data` in the constructor to make a deep copy of raw Data initially
> 3. Added `paginatedData` getter function to compute paginated filtered data
> 4. Updated `pageNumbers` to use Math.ceil
> 5. Updated `search` and `paginate` to not `paginat`e this.data only filter
> 6. Removed unnecessary codes
### Modified Data.js
[`Data`](/src/modules/data/Data.js)
> 1. Made Observable
### Modified FilterableVehicleTable
[`FilterableVehicleTable`](/src/modules/main/FilterableVehicleTable.js)
> 1. Used `store.paginatedData` for display


I think that's it, it works on my computer as I expected it to be
