import { useEffect, useRef, useState } from "react";
import React from "react";

export default function ToDo() {
  const [state, setState] = useState({
    items: [],
    dataLoaded: false,
    modal: false,
  });
  const [modal, setModal] = useState(null);
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);

  const handlerAddButt = () => {
    let inputTitle = titleInput.current.value;
    let inputDescription = descriptionInput.current.value;
    const newItem = {
      title: inputTitle,
      description: inputDescription,
      completed: false,
      id: state.items.length + 1,
    };
    if (newItem.title !== "" && newItem.description !== "") {
      setState({
        items: state.items.concat(newItem),
        dataLoaded: true,
        modal: false,
      });
    }
    inputTitle = titleInput.current.value = "";
    inputDescription = descriptionInput.current.value = "";
  };

  const handletToggleCompleted = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items[itemIdx].completed = !state.items[itemIdx].completed;
    setState({ ...state, items: state.items });
  };

  const handleShowModal = (id) => {
    const item = state.items.find((item) => item.id === id);
    setModal(item);
  };

  useEffect(() => {
    const loadedState = JSON.parse(localStorage.getItem("ToDo"));
    if (loadedState) {
      setState({ items: loadedState.items, dataLoaded: true, modal: false });
    }
  }, []);

  useEffect(() => {
    console.log(state);
    if (state.dataLoaded) {
      localStorage.setItem("ToDo", JSON.stringify({ items: state.items }));
    }
  }, [state]);

  return (
    <div className="flex flex-col justify-center items-center mt-[1px]">
      <h1 className="text-h1 text-83 -mb-4 -mt-2 w-550 text-center font-sans">
        todos
      </h1>
      <div className="bg-white border border-gray border-opacity-20 mt-[3px] shadow-xl  border-none w-[700px]">
        <div>
          <div className="flex justify-center items-center">
            <div>
              <h2 className="mx-4 mt-2">Title:</h2>
              <input
                className="border m-4 placeholder:pl-1"
                typeof="text"
                id="textInp"
                placeholder="Enter title"
                ref={titleInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlerAddButt();
                  }
                }}
              ></input>
            </div>
            <div>
              <h2 className="mx-4 mt-2">Description:</h2>
              <div>
                <input
                  className="border m-4 placeholder:pl-1"
                  ref={descriptionInput}
                  placeholder="Enter description"
                ></input>
                <button
                  className="m-4 p-1 border text-center"
                  onClick={() => handlerAddButt()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-4 px-10 p-3 gap-2 ">
          <div className=" grid grid-cols-4 gap-10 items-center justify-items-center">
            <div>ID</div>
            <div>TITLE</div>
            <div>DESCRIPTION</div>
            <div>STATUS</div>
          </div>
          {state.items.length > 0
            ? state.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" bg-main p-2 grid grid-cols-4 gap-10 justify-items-center "
                    onClick={() => handleShowModal(item.id)}
                  >
                    <div>{item.id}.</div>
                    <div className="truncate w-full">{item.title}</div>
                    <div className="truncate w-full">{item.description}</div>
                    <div>
                      {" "}
                      <input
                        type="checkbox"
                        onChange={() => handletToggleCompleted(item.id)}
                        onClick={(e) => e.stopPropagation()}
                        checked={item.completed && "checked"}
                      ></input>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {modal && (
        <div
          key={modal.id}
          className={`${
            modal ? "fixed bg-gray w-full h-full top-0" : "hidden"
          }`}
        >
          <div className="bg-white m-40 w-300">
            <div className="text-center pt-10 font-semibold text-2xl">
              {modal.title}
            </div>
            <div className="p-5 font-semibold">Description:</div>
            <div className="pl-5 py-2">{modal.description}</div>
            <div className="pl-5 py-2">
              Status:{" "}
              <input
                type="checkbox"
                onChange={() => handletToggleCompleted(modal.id)}
                checked={modal.completed && "checked"}
              ></input>
            </div>
            <button
              className="m-5 py-1 border rounded-xl"
              onClick={() => setModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
