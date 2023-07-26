import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.scss',
  shadow: true,
})
export class MyCard {
  // mutable true, fixes resolve change props
  @Prop({ mutable: true }) userName: string;

  @State() APIData: string = 'starting value';
  // @State() showCard: boolean = true;
  @State() showReactTab: boolean = false;
  @State() showStencilTab: boolean = false;

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
    // this method is only called once it's a good place to load data asynchronously
    console.log('componentWillLoad component is about to load');
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

  render() {
    let reactContent = (
      <div>
        <div class="card-custom" id="react-div">
          Hello, from React <br></br>
          Live Users
          <button class="btn-react small-btn" onClick={this.changeState.bind(this)}>
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
        <div>Live Users</div>
        <button class="btn-stencil small-btn">Get Stencil Users</button>
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
      </div>
    );
    return mainContent;
  }
}
