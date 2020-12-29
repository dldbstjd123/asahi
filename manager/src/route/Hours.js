import React, { useState, useEffect } from "react"
import { domain } from "../config"

const Hours = () => {
    const [schedule, setSchedule] = useState([])
    const [specialHour, setSpecialHour] = useState()
    const [specialHourStatus, setSpecialHourStatus] = useState()
    let count = 0

    useEffect(() => {
        fetch(`${domain}admin/hours/get`, {
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
                console.log(JSON.stringify(data))
                setSchedule(data)
            })

        fetch(`${domain}admin/specialhours/get`, {
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
                setSpecialHour(data[0].description)
                setSpecialHourStatus(data[0].status)
            })
    }, [])

    function onChangeHandler(event) {
        let theIndex = event.target.getAttribute("akey")
        let selectedIndex = schedule[theIndex]
        selectedIndex[event.target.name] = event.target.value
        console.log(`selectedIndex = ${selectedIndex}`)
        setSchedule(array => {
            console.log("1", array)
            array.splice(theIndex, 1, selectedIndex)
            return [...array]
        })
    }

    async function updateHandler() {
        const doWork = await fetch(`${domain}admin/hours/update`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(schedule)
        })
        const doWork2 = await fetch(`${domain}admin/hours/specialupdate`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: specialHour,
                status: specialHourStatus
            })
        })
        window.location.reload()
    }
    return (
        <div>
            <div>Category Page</div>
            <div>
                <form>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Open time</th>
                                <th>Close time</th>
                            </tr>
                            {schedule.map(item => {
                                count++
                                return (
                                    <tr key={item.id}>
                                        <td>{item.date}</td>
                                        <td>
                                            <input
                                                akey={count - 1}
                                                type="text"
                                                name="openhour"
                                                value={item.openhour}
                                                onChange={onChangeHandler}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                akey={count - 1}
                                                type="text"
                                                name="closehour"
                                                value={item.closehour}
                                                onChange={onChangeHandler}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                akey={count - 1}
                                                name="status"
                                                value={item.status}
                                                onChange={onChangeHandler}
                                            >
                                                <option value={parseInt(1)}>
                                                    Open
                                                </option>
                                                <option value={parseInt(0)}>
                                                    Closed
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td>Special Hour</td>
                                <td>
                                    <input
                                        type="text"
                                        value={specialHour}
                                        onChange={e =>
                                            setSpecialHour(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={specialHourStatus}
                                        onChange={e =>
                                            setSpecialHourStatus(
                                                e.currentTarget.value
                                            )
                                        }
                                    >
                                        <option value="on">On</option>
                                        <option value="off">Off</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <input
                            type="button"
                            value="UPDATE"
                            onClick={updateHandler}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Hours
