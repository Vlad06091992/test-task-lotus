import React, {ChangeEvent} from 'react';
import axios from 'axios';

type State = {
    searchString:string,
    searchResults: Person[],
}


type Person = {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
};

class App extends React.Component {
  debouncedSearch: (...args:any) => void;
  state:State
  constructor(props:{}) {
    super(props);
    this.state = {
      searchString: '',
      searchResults: [],
    };

    this.debouncedSearch = this.debounce(this.search, 1000);
  }

  debounce(func:Function, delay:number) {
    let timer:NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
      // debugger
    const searchString = event.target.value;
    this.setState({ searchString });
    this.debouncedSearch(searchString);
  };

  search = async (string:string) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${string}`);
      this.setState({ searchResults: response.data.results });
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  render() {
    const { searchString, searchResults } = this.state;

    return (
        <div>
          <input
              type="text"
              value={searchString}
              onChange={this.handleInputChange}
              placeholder="Введите имя персонажа"
          />
          <ul>
            {searchResults.map((result:Person) => (
                <li key={result.created}>{result.name}</li>
            ))}
          </ul>
        </div>
    );
  }
}

export default App