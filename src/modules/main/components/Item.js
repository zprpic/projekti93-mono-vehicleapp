import React, { useState } from "react";

function Item({ name, model, onClick, id, onSubmit }) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [carName, setCarName] = useState(name);
  const [carModel, setCarModel] = useState(model);
  return (
    <>
      {isBeingEdited ? (
        <form
          id="editCarForm"
          index={id}
          onSubmit={() => setIsBeingEdited(false)}
          className="item-edit"
        >
          <input
            type="text"
            placeholder="Name:"
            defaultValue={name}
            onChange={(e) => setCarName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Model:"
            defaultValue={model}
            onChange={(e) => setCarModel(e.target.value)}
          />
          <button
            form="editCarForm"
            type="submit"
            onClick={() => onSubmit(carName, carModel, id)}
          >
            Save
          </button>
        </form>
      ) : (
        <div className="item" id={id}>
          <p className="name">{name}</p>
          <p className="model">{model}</p>
          <button
            className="item-delete"
            onClick={(e) => onClick(e.target.parentElement.id)}
          >
            x
          </button>
          <button onClick={() => setIsBeingEdited(true)}>Edit</button>
        </div>
      )}
    </>
  );
}

export default Item;
