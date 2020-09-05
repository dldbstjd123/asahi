import React, { useState, useEffect } from "react";
import { domain } from "../config";
import { useHistory } from "react-router-dom";

const Menu = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  let count = 0;

  function handleChange(event) {
    let indexOfEvent = event.target.getAttribute("akey");
    let currentObject = list[indexOfEvent];
    let chosenName = event.target.name;
    currentObject[chosenName] = event.target.value;
    setList((array) => {
      array.splice(indexOfEvent, 1, currentObject);
      return [...array];
    });
  }

  function goToUpdatePage(event){
    let item = event.target.getAttribute("akey");
    history.push(`/admin/menu_update?item=${item}`)
  }
  function goToAddPage(event){
    history.push(`/admin/menu_add`)
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
                <th><input type="button" onClick={goToAddPage} value="Add" /></th>
              </tr>
              {list.map((item) => {
                count ++
                let imagePath = ""
                if(item.image){
                  imagePath = `${domain}client/image?image=${item.image}`
                }
                
                return (
                  <tr key={item.id}>
                    <td>{count}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.sort}</td>
		                <td>{item.image ? <div><img src={imagePath} style={{width:'150px'}}/></div>: <div>No Image</div>}</td>
                    <td><input type="button" akey={item.id} onClick={goToUpdatePage} value="Update"/></td>
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
