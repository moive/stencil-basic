import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.scss',
  shadow: true,
})
export class MyCard {
  // mutable true, fixes resolve change props
  @Prop({ mutable: true }) userName: string;

  changeState() {
    this.userName = 'name has been updated';
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
    let mainContent = (
      <div class="my-card-wrapper">
        {this.userName ? <h1>Hi, I am {this.userName} </h1> : ''}
        <button class="btn-stencil">Stencil</button>
        <button class="btn-react">React</button>
        {reactContent}
        {stencilContent}
      </div>
    );
    return mainContent;
  }
}
