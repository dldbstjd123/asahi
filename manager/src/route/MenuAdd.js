import React, {useState, useEffect} from "react"
import {useLocation, useHistory} from "react-router-dom"
import {domain} from "../config"
import "../css/MenuUpdate.css"

const MenuUpdate = props => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState(1)
    const [sort, setSort] = useState(1)
    const [sortOption, setSortOption] = useState(<></>)

    const [categoryOptions, setCategoryOptions] = useState([])
    const [imageFile, setImageFile] = useState(["beforeSetImage"])
    let count = 0

    function handleImageChange(event) {
        //event.target.value = event.target.files[0].name
        if (event.target.files[0] != undefined) {
            setImageFile(event.target.files[0])
        }
    }
    async function addHandler(event) {
        const pass = validate()
        if (!pass) {
            return false
        }
        const formData = new FormData()
        formData.append("file1", imageFile)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("sort", sort)

        fetch(`${domain}admin/menu_add/add`, {
            method: "POST",
            body: formData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data.status == "succeed") {
                    history.push("/admin/menu")
                }
            })
        //window.location.reload();
    }

    function validate() {
        let regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
        if (name == "") {
            alert("Please insert name")
            return false
        } else if (price == "") {
            alert("Please insert price")
            return false
        } else if (!regex.test(price)) {
            alert("Please insert valid price")
            return false
        } else if (description == "") {
            alert("Please insert description")
            return false
        } else {
            return true
        }
    }

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
                setCategoryOptions(data)
            })
    }, [])

    useEffect(() => {
        setSortOption(() => {
            let options = []
            for (let i = 1; i < 51; i++) {
                options.push(i)
            }
            return (
                <select
                    name="sort"
                    value={sort}
                    onChange={event => {
                        setSort(event.target.value)
                    }}
                >
                    {options.map(array => {
                        return (
                            <option key={array} value={array}>
                                {array}
                            </option>
                        )
                    })}
                </select>
            )
        })
    }, [sort])
    return (
        <div>
            <div>Menu Add Page</div>
            <div>
                <form>
                    <table style={{width: "100%"}}>
                        <tbody id="table">
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
                                        value={name}
                                        onChange={event => {
                                            setName(event.target.value)
                                        }}
                                    />
                                </td>
                                <th>PRICE</th>
                                <td>
                                    <input
                                        akey={count}
                                        type="text"
                                        name="price"
                                        required
                                        value={price}
                                        onChange={event => {
                                            setPrice(event.target.value)
                                        }}
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
                                        value={description}
                                        onChange={event => {
                                            setDescription(event.target.value)
                                        }}
                                    />
                                </td>
                                <th>CATEGORY</th>
                                <td>
                                    <select
                                        akey={count}
                                        name="category"
                                        value={category}
                                        onChange={event => {
                                            setCategory(event.target.value)
                                        }}
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
                                <td>{sortOption}</td>
                            </tr>

                            <tr style={{marginTop: "20px"}}>
                                <td></td>
                                <td>
                                    <input
                                        type="button"
                                        className="buttons"
                                        akey={count}
                                        value="Add"
                                        onClick={addHandler}
                                    />
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default MenuUpdate
