const Search = (props) => {
    return (
        <>
            <h3>Filter your phonebook list</h3>
            <input className="searchInput" placeholder="search..." type="search" value={props.personsToShow} onChange={props.updatePersonsToShow} />
        </>
    )
}

export default Search