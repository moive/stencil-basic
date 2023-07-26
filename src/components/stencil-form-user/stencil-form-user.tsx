import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'stencil-form-user',
  styleUrl: 'stencil-form-user.scss',
  shadow: true,
})
export class StencilFormUser {
  // mutable true, fixes resolve change props
  @Prop({ mutable: true }) isEdit: boolean = false;
  @Prop({ mutable: true }) item = {};

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
    let formContent = (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" name="username" value={this.user.username} placeholder="Ingrese nombre" onInput={e => this.handleChange(e)} />
        </div>
        <div class="mb-3">
          <label class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" name="email" value={this.user.email} placeholder="Ingrese correo electrónico" onInput={e => this.handleChange(e)} />
        </div>
        <div class="mb-3">
          <label class="form-label">Telefóno</label>
          <input type="text" class="form-control" name="phone" value={this.user.phone} placeholder="Ingrese teléfono" onInput={e => this.handleChange(e)} />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    );
    return formContent;
  }
}
