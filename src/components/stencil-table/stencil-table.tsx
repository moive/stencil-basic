import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'stencil-table',
  styleUrl: 'stencil-table.scss',
  shadow: true,
})
export class StencilTable {
  @Prop({ mutable: true }) items = [];

  @State() user = {
    username: '',
    email: '',
    phone: '',
  };

  @Event() itemUser: EventEmitter;
  // @Event({ bubbles: true, composed: true }) itemUser: EventEmitter;

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.user);
    this.itemUser.emit(this.user);
  }

  handleChange(event) {
    this.user[event.target.name] = event.target.value;
  }

  render() {
    let tableContent = (
      <table class="table">
        <thead>
          <tr>
            <th scope="col"># </th>
            <th scope="col">Username </th>
            <th scope="col">Email </th>
            <th scope="col">Phone </th>
          </tr>
        </thead>
        <tbody>
          {this.items.map(item => (
            <tr>
              <th scope="row">1</th>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return tableContent;
  }
}
