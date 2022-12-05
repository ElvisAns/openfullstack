const Search = (props)=>{
    return(
        <input type="search" value={props.personsToShow} onChange={props.updatePersonsToShow}/>
    )
}

export default Search