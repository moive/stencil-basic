import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'search-world',
  styleUrl: 'search-world.scss',
  shadow: true,
})
export class SearchWold {
  @Prop({ mutable: true }) searchText: string;
  @State() searchResult: { name: string; markeOpen: string }[] = [];
  @State() userInput: string;

  @State() urlApi: string = '';

  onUserInput(event: Event) {
    this.userInput = (event.target as HTMLInputElement).value;
    this.searchText = this.userInput;
  }

  searchFromAPI() {
    this.urlApi = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + this.searchText + '&apikey=865I8ZLN51M0ZVJY';

    fetch(this.urlApi)
      .then(res => res.json())
      .then(data => {
        let metaData = data['bestMatches'];
        this.searchResult = metaData.map(d => {
          return {
            name: d['2. name'],
            marketOpen: d['5. marketOpen'],
          };
        });
        console.log(this.searchResult);
      });
  }

  render() {
    return (
      <div class="main-search-div">
        <input class="my-input-textbox" type="text" value={this.searchText} onInput={this.onUserInput.bind(this)} />
        <button class="btn-react" onClick={this.searchFromAPI.bind(this)}>
          Search it!
        </button>
        <hr />
        <table id="api-table">
          {this.searchResult.map(r => (
            <tr>
              <td>{r.name}</td>
              <td>{r.markeOpen}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
