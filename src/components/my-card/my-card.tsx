import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.scss',
  shadow: true,
  // scoped: true,
})
export class MyCard {
  // mutable true, fixes resolve change props
  @Prop({ mutable: true }) userName: string;

  @State() APIData: string = 'starting value';
  // @State() showCard: boolean = true;
  @State() showReactTab: boolean = false;
  @State() showStencilTab: boolean = false;

  @State() myStencilUsers: string;
  @State() myReactUsers: string;
  @State() urlApi: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

  changeState() {
    this.userName = 'name has been updated';
    this.APIData = 'we have data from api';
    // this.showCard = false;
  }

  @Watch('userName')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of name is: ' + newValue + ', old value: ' + oldValue);
  }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate...!');
  // }

  connectedCallback() {
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  componentWillLoad() {
    // this method is only called once it's a good place to load data asynchronously.
    console.log('componentWillLoad component is about to load');
    this.APIData = 'loading...';

    fetch(this.urlApi)
      .then(res => res.json())
      .then(data => {
        let metaData = data['Meta Data'];
        let timeDateStencil = metaData['1. Information'];
        this.APIData = timeDateStencil;
      });
  }

  componentWillRender() {
    // It's always recommended to make any rendered state updates
    // within componentWiilRender()
    console.log('componentWillRender');
  }

  componentDidLoad() {
    // Called once just after the component fully loaded
    // and the first render() occurs.
    console.log('componentDidLoad');
    // this.APIData = 'API has been updated';
  }

  componentShouldUpdate() {
    // This hook is called when the component's Prop or State
    // property changes and a rerender is about to be requested.
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate - is called since we are updating this.myAPIData in componentDidLoad');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate - is called since we are updating this.myAPIData in componentDidLoad');
  }

  getDateNow() {
    //getUTCFullYear(), getUTCMonth(), getUTCDay().
    const dateNow = new Date();
    const year = dateNow.getUTCFullYear();
    let month: string | number = dateNow.getUTCMonth() + 1;
    let day: string | number = dateNow.getUTCDate() - 1;
    // const hours = dateNow.getHours();
    // const minutes = dateNow.getMinutes();
    // const second = dateNow.getSeconds();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${year}-${month}-${day}`;
    // return `${year}-${month}-${day} ${hours}:${minutes}:${second}`;
  }

  getStencilUserFromAPI() {
    this.myStencilUsers = 'loading data...';
    fetch(this.urlApi)
      .then(res => res.json())
      .then(data => {
        const timeSeries = data['Time Series (5min)'];
        const timeDateStencil = timeSeries[this.getDateNow() + ' 19:55:00'];
        this.myStencilUsers = timeDateStencil['5. volume'];
      })
      .catch(ex => console.log(ex));
  }

  getReactUserFromAPI() {
    this.myReactUsers = 'loading data...';
    fetch(this.urlApi)
      .then(res => res.json())
      .then(data => {
        const timeSeries = data['Time Series (5min)'];
        const timeDateReact = timeSeries[this.getDateNow() + ' 19:55:00'];
        console.log(timeSeries);
        this.myReactUsers = timeDateReact['5. volume'];
      })
      .catch(ex => console.log(ex));
  }

  fetchDataFromAPI(contentType: string) {
    if (contentType == 'stencil') {
      this.getStencilUserFromAPI();
    } else {
      this.getReactUserFromAPI();
    }
  }

  onContentChange(content: string) {
    if (content == 'reacttab') {
      this.showReactTab = true;
      this.showStencilTab = false;
    } else if (content == 'stenciltab') {
      this.showReactTab = false;
      this.showStencilTab = true;
    } else {
      this.showReactTab = false;
      this.showStencilTab = false;
    }
  }

  onUserInput(event: Event) {
    this.userName = (event.target as HTMLInputElement).value;
  }

  render() {
    let reactContent = (
      <div>
        <div class="card-custom" id="react-div">
          Hello, from React <br></br>
          Live Users <span>{this.myReactUsers}</span>
          <button class="btn-react small-btn" onClick={this.fetchDataFromAPI.bind(this, 'react')}>
            Get React Users
          </button>
        </div>
      </div>
    );

    let stencilContent = (
      <div>
        <div class="card-custom" id="stencil-div">
          Hello, from stencil
        </div>
        <div>
          Live Users <span>{this.myStencilUsers}</span>
        </div>
        <button class="btn-stencil small-btn" onClick={this.fetchDataFromAPI.bind(this, 'stencil')}>
          Get Stencil Users
        </button>
      </div>
    );

    let contentToDisplay = '';
    if (this.showReactTab) {
      contentToDisplay = reactContent;
    } else if (this.showStencilTab) {
      contentToDisplay = stencilContent;
    }

    let mainContent = (
      <div class="my-card-wrapper">
        {this.userName ? <h1>Hi, I am {this.userName} </h1> : ''}
        <h5>{this.APIData}</h5>
        <button class="btn-stencil" onClick={this.onContentChange.bind(this, 'reacttab')}>
          Stencil
        </button>
        <button class="btn-react" onClick={this.onContentChange.bind(this, 'stenciltab')}>
          React
        </button>
        {contentToDisplay}
        <h></h>
        <h3>Two way data binding in stencil</h3>
        <input type="text" class="my-input-textbox" onInput={this.onUserInput.bind(this)} value={this.userName} />
      </div>
    );
    return mainContent;
  }
}
