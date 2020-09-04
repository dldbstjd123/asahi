import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { domain } from "../config";

const MenuUpdate = (props) => {
  let query = new URLSearchParams(useLocation().search)
  const [list, setList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  let count = 0;
  function handleChange(event) {
    let indexOfEvent = event.target.getAttribute("akey");
    console.log(`indexOfEvent = ${indexOfEvent}`);
    let currentObject = list[indexOfEvent];
    console.log(`currentObject = ${currentObject}`);
    let chosenName = event.target.name;
    currentObject[chosenName] = event.target.value;
    //console.log(currentObject)
    setList((array) => {
      console.log("1", array);
      array.splice(indexOfEvent, 1, currentObject);
      return [...array];
    });
    //console.log(list)
  }
  useEffect(() => {
    fetch(`${domain}admin/menu_update/get?item=${query.get("item")}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${domain}admin/category/get`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`categoryOptions = ${categoryOptions}`);
        setCategoryOptions(data);
        console.log(`categoryOptions = ${categoryOptions}`);
      });
  }, []);
  return (
    <div>
      <div>Menu Update Page</div>
      <div>
        <form>
          <table style={{ width: "100%" }}>
              {list.map((item) => {
                let activeSelect = "";
                if (item.active) {
                  activeSelect = (
                    <select
                      akey={item.id}
                      name="active"
                      onChange={handleChange}
                    >
                      <option value="true">yes</option>
                      <option value="false">No</option>
                    </select>
                  );
                } else {
                  activeSelect = (
                    <select
                      akey={item.id}
                      name="active"
                      onChange={handleChange}
                    >
                      <option value="true">yes</option>
                      <option selected value="false">
                        No
                      </option>
                    </select>
                  );
                }
                return (
		  <tbody key={item.id}>
                  <tr>
		    <th>NAME</th>
                    <td>
		      <input
                        akey={item.id}
                        type="text"
                        name="name"
                        required
                        value={item.name}
                        onChange={handleChange}
                      />
    		    </td>
		    <th>PRICE</th>
		    <td>
		      <input
                        akey={item.id}
                        type="text"
                        name="price"
                        required
                        value={item.price}
                        onChange={handleChange}
                      />
		    </td>
		  </tr>
		  <tr>
		    <th>DESCRIPTION</th>
		    <td>
                      <input
                        akey={item.id}
                        type="text"
                        name="description"
                        required
                        value={item.description}
                        onChange={handleChange}
                      />
                    </td>
		    <th>CATEGORY</th>
		    <td>
                      <select
                        akey={item.id}
                        name="category"
                        onChange={handleChange}
                        value={item.category}
                      >
                        {categoryOptions.map((array) => {
                          return (
                            <option key={array.id} value={array.id}>
                              {array.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
		  </tr>	
		  <tr>
		    <th>SORT</th>
                    <td>
                      <input
                        akey={item.id}
                        type="text"
                        name="sort"
                        required
                        value={item.sort}
                        onChange={handleChange}
                      />
                    </td>
		    <th>ACTIVE</th>
                    <td>
                      <select
                        akey={item.id}
                        name="active"
                        onChange={handleChange}
                        value={item.active}
                      >
                        <option value="true">yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
		  </tr>
		  <tr>
		    <td>IMAGE CONTINER</td>
		    <td>
                      <input
                        akey={item.id}
                        type="file"
                        name="image"
                        onChange={(event) => {
                          console.log(event.target.files[0].name);
                        }}
                      />
                    </td>
		  </tr>
		  <tr>
                    <td>Update</td>
                    <td>Delete</td>
                  </tr>
		  </tbody>
                );
              })}
          </table>
        </form>
      </div>
    </div>
  );
};

export default MenuUpdate;
