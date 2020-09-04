import React, { useState, useEffect } from "react";
import { domain } from "../config";
import { useHistory } from "react-router-dom";

const Menu = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
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

  function goToUpdatePage(event){
    let item = event.target.getAttribute("akey");
    console.log(item)
    history.push(`/admin/menu_update?item=${item}`)
  }
  useEffect(() => {
    fetch(`${domain}admin/menu/get`, {
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
  return (
    <div>
      <div>Menu Page</div>
      <div>
        <form>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>No.</th>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Order</th>
                <th>Image</th>
                <th>Active</th>
                <th></th>
                <th></th>
              </tr>
              {list.map((item) => {
                count ++
                return (
                  <tr key={item.id}>
                    <td>{count}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.sort}</td>
                    <td>{item.active}</td>
                    <td><input type="button" akey={item.id} onClick={goToUpdatePage} value="Update"/></td>
                    <td>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Menu;
