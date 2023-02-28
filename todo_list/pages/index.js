import { useEffect, useRef, useState } from "react";

export default function ToDo() {
  const [state, setState] = useState({ items: [], filter: "all" });
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);

  const handlerAddButt = () => {
    let inputTitle = titleInput.current.value;
    let inputDescription = descriptionInput.current.value;
    const newItem = {
      title: inputTitle,
      description: inputDescription,
      completed: false,
      change: false,
      id: state.items.length + 1,
    };
    if (newItem.title !== "" && newItem.description !== "") {
      setState({ items: state.items.concat(newItem), filter: "all" });
    }
    inputTitle = titleInput.current.value = "";
    inputDescription = descriptionInput.current.value = "";
  };

  const handletToggleCompleted = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items[itemIdx].completed = !state.items[itemIdx].completed;
    setState({ ...state, items: state.items });
  };

  const handlerDeleteButt = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items.splice(itemIdx, 1);
    setState({ ...state, items: state.items });
  };

  const list1 = state.items.map((item) => {
    return (
      <tbody>
        <td>{item.id}.</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>
          {" "}
          <input
            type="checkbox"
            onClick={() => handletToggleCompleted(item.id)}
          ></input>
        </td>
      </tbody>
    );
  });

  useEffect(() => {
    const loadedState = JSON.parse(localStorage.getItem("ToDo"));
    if (loadedState) {
      setState(loadedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ToDo", JSON.stringify(state));
  }, [state]);

  return (
    <div className="flex flex-col justify-center items-center mt-[1px]">
      <h1 className="text-h1 text-83 -mb-4 -mt-2 w-550 text-center font-sans">
        todos
      </h1>
      <div className="bg-white border border-gray border-opacity-20 mt-[3px] shadow-xl  border-none">
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
        <div>
          <table className="w-full text-center">
            <thead>
              <td>ID</td>
              <td>TITLE</td>
              <td>DESCRIPTION</td>
              <td>STATUS</td>
            </thead>
            {state.items.length > 0 ? list1 : null}
          </table>
        </div>
      </div>
    </div>
  );
}
