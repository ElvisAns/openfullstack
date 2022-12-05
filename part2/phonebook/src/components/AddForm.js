const AddForm = (props) => {
    return(
        <form onSubmit={props.saveUser}>
            <label>Person Name</label>
            <input onChange={props.setNewPerson} value={props.newPerson} placeholder="John Doe" type="text"/>

            <label>Telephone</label>
            <input onChange={props.setNewPhone} value={props.newPhone} placeholder="+1" type="tel"/>

            <button>save</button>

        </form>
    )
}

export default AddForm