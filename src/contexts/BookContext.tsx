import React, { createContext, useState, useEffect } from 'react'
import * as BooksAPI from './../BooksAPI'

interface BookI {
    allBooks: Array<any>,
    shelves: CategorizedBooks
    needsRefreshing: boolean,
    isLoading: boolean,
    message: string,
    refreshPage: () => void,
    rearrangeShelves: (id: string, shelf: string) => any[],
    updateBookShelves: (books:CategorizedBooks, id:string, shelf:string ) => void
}

interface CategorizedBooks {
    [key:string]: Array<any>
    currentlyReading: Array<any>,
    wantToRead: Array<any>,
    read: Array<any>,
}

interface SingleBook {
    id: string,
    shelf: string
}

const BookContext = createContext({} as BookI);

export const BookProvider = (props:any) => {
    const [ allBooks, setAllBooks ] = useState<SingleBook[]>([])
    const [ needsRefreshing, setNeedsRefreshing ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ message, setMessage ] = useState("Book data is retrieved from server at the moment. Please wait. Should not be so long.")
    const [ currentlyReading, setCurrentlyReading ] = useState([""])
    const [ wantToRead, setWantToRead ] = useState([""])
    const [ read, setRead ] = useState([""])
  
    useEffect( () => { fetchBooks() }, [])
  
    function rearrangeShelves(id: string, shelf: string) {
      // takes the shelf info from Book component when the shelf changes pipes it to updateBookShelves
      return allBooks.map( book => {
        if (book.id === id) { book.shelf = shelf }
        return book
      })
    }
  
    function updateBookShelves(books:CategorizedBooks, id:string, shelf:string ) {
      //updates the book shelves and sets the state accordingly
      let newBooks = rearrangeShelves(id, shelf);
    }

    
    function refreshPage() {
        needsRefreshing ? setNeedsRefreshing(false) : setNeedsRefreshing(true)
        fetchBooks()
    }

    async function fetchBooks() {
        let myBooks = await BooksAPI.getAll()
        if (myBooks) {
            setAllBooks(myBooks)
            setIsLoading(false)
            setCurrentlyReading( myBooks.filter( (book:any) => book.shelf === "currentlyReading") )
            setWantToRead( myBooks.filter( (book:any) => book.shelf === "wantToRead") )
            setRead( myBooks.filter( (book:any) => book.shelf === "read") )
        } else {
            setMessage("There occured a problem while retrieving data. Fetch Failed. Try refreshing the page. If problem persist, please inspect the error in the console.")
        }
    }

    return(
        <BookContext.Provider value={{
            allBooks,
            shelves: {
                currentlyReading,
                wantToRead,
                read
            },
            needsRefreshing,
            isLoading,
            message,
            refreshPage,
            rearrangeShelves,
            updateBookShelves
        }}>{ props.children }</BookContext.Provider>
    )
}

export const BookConsumer = BookContext.Consumer

export default BookContext
