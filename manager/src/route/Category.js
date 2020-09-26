import React, { useState, useEffect } from "react"
import { domain } from "../config"
import { useHistory } from "react-router-dom"

const Category = () => {
    const history = useHistory()
    const [list, setList] = useState([])
    const [addData, setAddData] = useState()
    const [optionTo20, setOptionTo20] = useState([])
    let count = 0

    function onChangeHandler(event) {
        let indexOfEvent = event.target.getAttribute("akey")
        console.log(`indexOfEvent = ${indexOfEvent}`)
        let currentObject = list[indexOfEvent]
        console.log(`currentObject = ${currentObject}`)
        let chosenName = event.target.name
        currentObject[chosenName] = event.target.value
        //console.log(currentObject)
        setList(array => {
            console.log("1", array)
            array.splice(indexOfEvent, 1, currentObject)
            return [...array]
        })
    }
    function changeAddData(event) {
        console.log(event.target.name)
        console.log(event.target.value)
    }

    async function updateHandler(event) {
        let targetOfList = event.target.getAttribute("akey")
        console.log(list[targetOfList])

        const doWork = await fetch(`${domain}admin/category/update`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list[targetOfList])
        })
        //window.location.reload();
        //history.push('/admin/category')
        history.go(0)
    }

    async function deleteHandler(event) {
        let targetOfList = event.target.getAttribute("akey")
        console.log(list[targetOfList])

        const numberOfItems = await fetch(
            `${domain}admin/category/checkbeforedelete`,
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(list[targetOfList])
            }
        )
            .then(response => {
                return response.json()
            })
            .then(res => {
                return res.results[0].count
            })

        if (numberOfItems == 0) {
            const doWork = await fetch(`${domain}admin/category/delete`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(list[targetOfList])
            })
            history.push("/admin/category")
            //window.location.reload()
        } else {
            alert("delete menu items before deleting category")
        }
    }
    async function addHandler(event) {
        const doWork = await fetch(`${domain}admin/category/add`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value,
                sort: event.target.sort.value
            })
        })
        history.push("/admin/category")
        //window.location.reload();
    }
    //   function makeOptions(n){
    //     let option
    //     for(let i=1; i<n; i++){
    //         if(option == undefined){
    //             option = <option value="${i}">${i}</option>
    //         }else{
    //             option += <option value="${i}">${i}</option>
    //         }
    //     }
    //     console.log(option)
    //     return <>{option}</>
    //   }

    useEffect(() => {
        for (let i = 1; i < 21; i++) {
            setOptionTo20(prev => {
                return [
                    ...prev,
                    <option key={i} value={i}>
                        {i}
                    </option>
                ]
            })
        }
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
                setList(data)
            })
    }, [])
    return (
        <div>
            <div style={{ fontSize: "20px", textAlign: "left" }}>
                Category Page
            </div>
            <div>
                <form>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Sort</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {list.map(item => {
                                count++
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>
                                            <input
                                                type="text"
                                                akey={count - 1}
                                                name="name"
                                                value={item.name}
                                                required
                                                onChange={onChangeHandler}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                akey={count - 1}
                                                name="description"
                                                value={item.description}
                                                onChange={onChangeHandler}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                akey={count - 1}
                                                name="sort"
                                                value={item.sort}
                                                required
                                                onChange={onChangeHandler}
                                            >
                                                {optionTo20}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="button"
                                                akey={count - 1}
                                                value="Update"
                                                onClick={updateHandler}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="button"
                                                akey={count - 1}
                                                value="Delete"
                                                onClick={deleteHandler}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
                <div
                    style={{
                        fontSize: "20px",
                        textAlign: "left",
                        marginTop: "20px"
                    }}
                >
                    Add
                </div>
                <form onSubmit={addHandler}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Sort</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={changeAddData}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="description"
                                        onChange={changeAddData}
                                    />
                                </td>
                                <td>
                                    <select
                                        name="sort"
                                        onChange={changeAddData}
                                    >
                                        {optionTo20}
                                    </select>
                                </td>
                                <td>
                                    <button type="submit">ADD</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default Category
