import React, {ChangeEvent} from 'react';
import axios from 'axios';
import {PersonType} from "../../types";
import {Preloader} from "../preloader/Preloader";
import Input from "../ui/input/input";
import Person from "../person/person";

import s from './App.module.css'

type State = {
    searchString: string,
    searchResults: PersonType[],
    isLoading: boolean
    isSearchPerformed: boolean;
}

class App extends React.Component {
    debouncedSearch: (arg:string) => void;
    state: State
    constructor(props: {}) {
        super(props);
        this.state = {
            searchString: '',
            searchResults: [],
            isLoading: false,
            isSearchPerformed: false
        };
        this.debouncedSearch = this.debounce(this.search, 1000);
    }
    debounce(func: Function, delay: number) {
        let timer: NodeJS.Timeout;
        return (...args: Array<unknown>) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        this.setState({searchString});
        this.debouncedSearch(searchString);
    };

    search = async (string: string) => {
        if (!string.length) {
            this.setState({searchResults: [],isSearchPerformed: false});
            return}

        try {
            this.setState({isLoading: true})
            const response = await axios.get(`https://swapi.dev/api/people/?search=${string}`);

            this.setState({
                isSearchPerformed: true,
                searchResults: response.data.results
            })
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        } finally {
            this.setState({isLoading:false})
        }
    };

    render() {
        const {searchString, searchResults} = this.state;

       return (
            <div>
                {this.state.isLoading && <Preloader/>}
                <Input value={searchString} onChange={this.handleInputChange}/>
                {this.state.searchResults.length > 0 && <ul>
                    {searchResults.map((p: PersonType) => (
                        <Person key={p.birth_year} person={p}/>
                    ))}
                </ul>}
                {this.state.isSearchPerformed && !this.state.searchResults.length && <ul>
                    <p className={s.description}>Персонажи с данным именем не нашлись :(</p>
                </ul>}
            </div>
        );
    }
}

export default App