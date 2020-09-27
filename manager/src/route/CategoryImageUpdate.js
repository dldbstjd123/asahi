import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { domain } from "../config"

const CategoryImageUpdate = props => {
    let query = new URLSearchParams(useLocation().search)
    const history = useHistory()
    const [categoryId, setCategoryId] = useState()
    const [imageFile, setImageFile] = useState(undefined)

    function handleImageChange(event) {
        if (event.target.files[0] != undefined) {
            setImageFile(event.target.files[0])
        } else {
            setImageFile(undefined)
        }
    }
    function updateImage(event) {
        if (imageFile !== undefined) {
            const formData = new FormData()
            formData.append("file", imageFile)
            formData.append("itemid", event.target.getAttribute("aid"))
            fetch(`${domain}admin/category/updateImage`, {
                method: "POST",
                body: formData
            }).then(res => {
                console.log(JSON.stringify(res))
            })
            history.push("/admin/category")
        }
    }
    useEffect(() => {
        setCategoryId(query.get("id"))
    }, [])
    useEffect(() => {
        console.log(imageFile)
    }, [imageFile])
    return (
        <div>
            <div>Image Update</div>
            <input type="file" name="image" onChange={handleImageChange} />
            <input
                type="button"
                className="buttons"
                aid={categoryId}
                value="Update"
                onClick={updateImage}
            />
        </div>
    )
}

export default CategoryImageUpdate
