import $ from 'doomerjs'

export class Heading {
  constructor(type, content) {
    this.$el = $.create(type, {})
  }
}
