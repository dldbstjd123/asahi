import React, {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"
import {domain} from "../config"
import "../css/MenuUpdate.css"

const MenuUpdate = props => {
    let query = new URLSearchParams(useLocation().search)
    const [list, setList] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [imageFile, setImageFile] = useState(["beforeSetImage"])
    let count = 0

    function handleChange(event) {
        let indexOfEvent = event.target.getAttribute("akey")
        console.log(`indexOfEvent = ${indexOfEvent}`)
        let currentObject = list[indexOfEvent]
        console.log(`currentObject = ${currentObject}`)
        let chosenName = event.target.name
        if (chosenName == "image") {
            currentObject[chosenName] = event.target.files[0].name
        } else {
            currentObject[chosenName] = event.target.value
        }
        //console.log(currentObject)
        setList(array => {
            console.log("1", array)
            array.splice(indexOfEvent, 1, currentObject)
            return [...array]
        })
        console.log(list)
    }
    function handleImageChange(event) {
        //event.target.value = event.target.files[0].name
        console.log(event.target.files[0])
        if (event.target.files[0] != undefined) {
            handleChange(event)
            setImageFile(event.target.files[0])
        }
    }
    async function updateHandler(event) {
        let targetOfList = event.target.getAttribute("akey")
        const formData = new FormData()
        formData.append("file1", imageFile)
        formData.append("itemid", event.target.getAttribute("aid"))
        for (let key in formData) {
            console.log(`formData${key} = ${formData[key]}`)
        }

        const doWork = await fetch(`${domain}admin/menu_update/update`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list[targetOfList])
        })
        const doWork2 = await fetch(`${domain}admin/menu_update/updateImage`, {
            method: "POST",
            //   mode: "cors",
            //   cache: "no-cache",
            //   credentials: "same-origin",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            body: formData
        })
        //window.location.reload();
    }
    function deleteHandler(event){
      fetch(`${domain}admin/menu_update/delete`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:event.target.getAttribute("aid")})
    })
    }
    useEffect(() => {
        console.log(`imageFile = ${imageFile}`)
    }, [imageFile])
    useEffect(() => {
        fetch(`${domain}admin/menu_update/get?item=${query.get("item")}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setList(data)
            })
    }, [])

    useEffect(() => {
        fetch(`${domain}admin/category/get`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(`categoryOptions = ${categoryOptions}`)
                setCategoryOptions(data)
                console.log(`categoryOptions = ${categoryOptions}`)
            })
    }, [])
    return (
        <div>
            <div>Menu Update Page</div>
            <div>
                <form>
                    <table style={{width: "100%"}}>
                        {list.map(item => {
                            let activeSelect = ""
                            if (item.active) {
                                activeSelect = (
                                    <select
                                        akey={count}
                                        name="active"
                                        onChange={handleChange}
                                    >
                                        <option value="true">yes</option>
                                        <option value="false">No</option>
                                    </select>
                                )
                            } else {
                                activeSelect = (
                                    <select
                                        akey={count}
                                        name="active"
                                        onChange={handleChange}
                                    >
                                        <option value="true">yes</option>
                                        <option selected value="false">
                                            No
                                        </option>
                                    </select>
                                )
                            }
                            return (
                                <tbody id="table" key={item.id}>
                                    <tr>
                                        <th>UPLOAD IMAGE</th>
                                        <td>
                                            <input
                                                akey={count}
                                                type="file"
                                                name="image"
                                                onChange={handleImageChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>NAME</th>
                                        <td>
                                            <input
                                                akey={count}
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
                                                akey={count}
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
                                                akey={count}
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
                                                akey={count}
                                                name="category"
                                                onChange={handleChange}
                                                value={item.category}
                                            >
                                                {categoryOptions.map(array => {
                                                    return (
                                                        <option
                                                            key={array.id}
                                                            value={array.id}
                                                        >
                                                            {array.name}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>SORT</th>
                                        <td>
                                            <input
                                                akey={count}
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
                                                akey={count}
                                                name="active"
                                                onChange={handleChange}
                                                value={item.active}
                                            >
                                                <option value="true">
                                                    yes
                                                </option>
                                                <option value="false">
                                                    No
                                                </option>
                                            </select>
                                        </td>
                                    </tr>

                                    <tr style={{marginTop: "20px"}}>
                                        <td></td>
                                        <td>
                                            <input
                                                type="button"
                                                className="buttons"
                                                akey={count}
                                                aid={item.id}
                                                value="Update"
                                                onClick={updateHandler}
                                            />
                                        </td>
                                        <td><input
                                                type="button"
                                                className="buttons"
                                                akey={count}
                                                aid={item.id}
                                                value="Delete"
                                                onClick={deleteHandler}
                                            /></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </form>
            </div>
        </div>
    )
}

export default MenuUpdate
