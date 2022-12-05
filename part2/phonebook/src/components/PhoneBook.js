const Phonebook = (props) => {
    const list = props.persons
    if (list.length === 0) {
        return (
            <>
                <h3>Numbers</h3>
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
            </>
        )
    }
    return (
        <>
            <h3>Numbers</h3>
            <table>
                <thead>
                    <tr>
                        <th>Names</th>
                        <td>Phone Number</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((v, i) => (<tr key={v.id}><td>{v.name}</td><td>{v.number}</td></tr>))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Phonebook