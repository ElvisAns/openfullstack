const Phonebook = (props) => {
    const list = props.persons
    return (
        <div>
            {
                list.map((v)=>(<li>{v.name} : {v.phone}</li>))
            }
        </div>
    )
}

export default Phonebook