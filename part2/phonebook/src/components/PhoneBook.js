const Phonebook = (props) => {
    const list = props.persons
    if (list.length === 0) {
        return (

            <table>
                <thead>
                    <tr>
                        <th>Names</th>
                        <td>Phone Number</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>Phone book empty</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Names</th>
                    <td>Phone Number</td>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((v) => (<tr><td>{v.name}</td><td>{v.phone}</td></tr>))
                }
            </tbody>
        </table>
    )
}

export default Phonebook