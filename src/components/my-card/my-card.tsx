import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.scss',
  shadow: true,
})
export class MyCard {
  // mutable true, fixes resolve change props
  @Prop({ mutable: true }) userName: string;

  @State() APIData: string;
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
  componentWillUpdate() {
    console.log('componentWillUpdate...!');
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
