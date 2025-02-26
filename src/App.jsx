import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, change, del, edit, toggleCheck } from "./reducers/todo";

const App = () => {
  let todos = useSelector((e) => e.todos.value);
  let dispatch = useDispatch();

  let [delMod, setDelMod] = useState(false);
  let [idxDel, setIdxDel] = useState(null);
  let delModCheck = useRef();

  let [optMod, setOptMod] = useState(false);
  let [optNum, setOptNum] = useState(null);
  let [optObjChecked, setOptObjChecked] = useState(false);

  let optCheck = useRef();

  let optObj = [
    {
      jsFun: "delete",
      color: "red",
      text: "Delete",
      icon: (
        <svg
          className="font-medium text-[18px] text-[#fff]"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 6H8H6.09813L7.22364 18.0054C7.27312 18.5332 7.30558 18.8717 7.35014 19.1287C7.39259 19.3735 7.43417 19.4648 7.46185 19.5113C7.5633 19.6818 7.71319 19.8183 7.89244 19.9034C7.94135 19.9266 8.0361 19.9595 8.28378 19.9789C8.54377 19.9993 8.88389 20 9.41403 20H14.586C15.1161 20 15.4562 19.9993 15.7162 19.9789C15.9639 19.9595 16.0587 19.9266 16.1076 19.9034C16.2868 19.8183 16.4367 19.6818 16.5381 19.5113C16.5658 19.4648 16.6074 19.3735 16.6499 19.1287C16.6944 18.8717 16.7269 18.5332 16.7764 18.0054L17.9019 6H16H14H10ZM15.874 4H18.0894L18.0977 3.91103L19.0468 4H21H22V6H21H19.9106L18.7676 18.192L18.7642 18.2282C18.7191 18.7095 18.68 19.1269 18.6205 19.4704C18.5573 19.8347 18.4597 20.1931 18.257 20.5338C17.9526 21.0454 17.503 21.4549 16.9652 21.7102C16.6071 21.8802 16.2411 21.9439 15.8725 21.9728C15.525 22 15.1058 22 14.6225 22H14.6225H14.6224H14.6224H14.586H9.41403H9.37758H9.37756H9.37754H9.37752C8.89418 22 8.47498 22 8.12748 21.9728C7.75894 21.9439 7.39294 21.8802 7.03478 21.7102C6.49703 21.4549 6.04737 21.0454 5.74303 20.5338C5.54033 20.1931 5.44271 19.8347 5.37955 19.4704C5.31998 19.1269 5.28087 18.7095 5.23576 18.2282L5.23237 18.192L4.08937 6H3H2V4H3H4.95323L5.90229 3.91103L5.91063 4H8.12602C8.57006 2.27477 10.1362 1 12 1C13.8638 1 15.4299 2.27477 15.874 4ZM10.2676 4C10.6134 3.4022 11.2597 3 12 3C12.7403 3 13.3866 3.4022 13.7324 4H10.2676ZM8.43957 8.06433L8.50195 9.06238L9.00195 17.0624L9.06433 18.0604L11.0604 17.9357L10.9981 16.9376L10.4981 8.93762L10.4357 7.93957L8.43957 8.06433ZM15.5604 8.06433L15.4981 9.06238L14.9981 17.0624L14.9357 18.0604L12.9396 17.9357L13.0019 16.9376L13.5019 8.93762L13.5643 7.93957L15.5604 8.06433Z"
            fill="red"
          ></path>
        </svg>
      ),
    },
    {
      jsFun: "edit",
      color: "blue",
      text: "Edit",
      icon: <i className="bx bx-edit-alt"></i>,
    },
    {
      jsFun: "toggle",
      color: "green",
      text: optObjChecked ? "Incomplete" : "Complete",
      icon: <i className="bx bx-check-square"></i>,
    },
  ];

  function addData(event) {
    event.preventDefault();
    if (event.target["addInp"].value.trim() !== "") {
      dispatch(
        add({
          id: new Date().getTime(),
          name: event.target["addInp"].value,
          complete: false,
        })
      );
      setAddInp("");
    } else {
      alert("Please enter a valid todo");
    }
  }

  let [addInp, setAddInp] = useState("");

  function openDelMod(id) {
    setDelMod(true);
    setIdxDel(id);
    setOptNum(null);
  }

  function openOptMod(e) {
    setOptNum(e.id);
    setOptMod(true);
    setOptObjChecked(e.complete);
  }

  let [editMod, setEditMod] = useState(false);
  let [editInp, setEditInp] = useState("");
  let [editIdx, setEditIdx] = useState(null);
  let editModCheck = useRef();

  function openEditMod(e) {
    setEditInp(e.name);

    setEditMod(true);
    setEditIdx(e.id);
    setOptNum(null);
  }

  let editData = function (event) {
    event.preventDefault();

    if (editInp.trim() !== "") {
      console.log(dispatch(edit({ id: editIdx, name: editInp })));

      setEditMod(false);
      setEditIdx(null);
      setEditInp("");
    } else {
      alert("Please enter a valid todo");
    }
  };

  let [filter, setFilter] = useState("");
  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);
  return (
    <div>
      <div className="header p-2 flex justify-between">
        <form
          onSubmit={addData}
          className="flex justify-between gap-2 items-center"
        >
          <input
            id="addInp"
            type="text"
            value={addInp}
            onChange={(e) => setAddInp(e.target.value)}
            placeholder="Enter your todo"
            className="border p-[5px_12px] outline-[#9a9adf] rounded-md"
          />
          <button className="border p-[5px_10px] bg-blue-500 text-[#fff] font-medium rounded-md">
            add
          </button>
        </form>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border outline-none pl-1 p-[5px_12px]"
        >
          <option value="">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      {optMod ? (
        <div
          onClick={(e) => {
            if (e.target !== optCheck.current) {
              setOptMod(false);
              setOptNum(null);
            }
          }}
          className="w-full h-full bg-transparent absolute top-0 left-0 z-30"
        ></div>
      ) : null}

      {delMod ? (
        <div
          onClick={(e) => {
            if (e.target == delModCheck.current) {
              setDelMod(false);
              setIdxDel(null);
            }
          }}
          ref={delModCheck}
          className="w-full flex z-[40] items-center justify-center h-full top-0 absolute left-0 right-0 bg-[#3e3b3b77]"
        >
          <div className="w-[50%] rounded-[15px] pb-0 bg-[#fff]">
            <span className="text-[20px] py-[20px] flex text-center  justify-center font-medium">
              Do you want to delete this todo?
            </span>
            <div>
              <button
                onClick={() => {
                  setDelMod(false);
                  dispatch(del(idxDel));
                  setIdxDel(null);
                }}
                className="w-[50%] font-medium active:bg-[#f7f4f4] text-[blue] p-[5px_12px] rounded-bl-[15px] border"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIdxDel(null);
                  setDelMod(false);
                }}
                className="w-[50%] font-medium active:bg-[#f7f4f4] text-[red] p-[5px_12px] rounded-br-[15px] border"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {editMod ? (
        <div
          onClick={(e) => {
            if (e.target == editModCheck.current) {
              setEditMod(false);
              setEditIdx(null);
              setEditInp("");
            }
          }}
          ref={editModCheck}
          className="w-full z-[60]  flex justify-center bg-[#3e3b3b77] items-center h-full absolute top-0 left-0"
        >
          <div className="w-[40%] items-center flex justify-center  h-[30%] bg-[#fff] ">
            <form
              className="flex justify-center items-center gap-2"
              onSubmit={editData}
            >
              <input
                id="editInp"
                value={editInp}
                onChange={(e) => setEditInp(e.target.value)}
                type="text"
                required
                autoFocus
                className="border rounded-md outline-blue-500 p-[5px_12px]"
              />
              <button
                type="submit"
                className="bg-blue-600 p-[5px_12px] font-medium text-[#fff] rounded-md"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div>
        {todos
          .filter((e) => {
            return e.name.includes(addInp.trim());
          })
          .filter((e) => {
            if (filter == "complete") {
              return e.complete;
            } else if (filter == "incomplete") {
              return !e.complete;
            } else {
              return e;
            }
          })
          .map((e) => {
            return (
              <div
                key={e.id}
                className="flex bg-blue-400 border-b relative items-center justify-between p-2"
              >
                <div className="flex flex-col p-2">
                  <div
                    className="font-medium text-[16px]"
                    style={
                      e.complete
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {e.name}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => openOptMod(e)}
                    className="flex items-center"
                  >
                    <i className="bx bx-dots-horizontal-rounded text-[22px]"></i>
                  </button>
                </div>
                {optMod && e.id == optNum ? (
                  <div
                    ref={optCheck}
                    className="absolute  border text-black z-40 flex flex-col top-0 duration-[0.3s]  right-0 bg-[#fff] w-[120px]"
                  >
                    {optObj.map((e, i) => {
                      return (
                        <button
                          onClick={() => {
                            if (e.jsFun == "delete") {
                              openDelMod(optNum);
                            } else if (e.jsFun == "toggle") {
                              dispatch(toggleCheck(optNum));
                              setOptNum(null);
                            } else if (e.jsFun == "edit") {
                              openEditMod(
                                todos.find((e) => {
                                  return e.id == optNum;
                                })
                              );
                            }
                          }}
                          key={i}
                          style={{ color: e.color }}
                          className="font-medium text-[16px] border-b p-1 hover:bg-[#ededed] bg-[#fff] flex items-center justify-between"
                        >
                          {e.text}
                          {e.icon}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
