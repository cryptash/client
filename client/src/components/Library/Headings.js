import $ from 'doomerjs'

export class Heading {
  constructor(type, className) {
    this.$el = $.create(type, className)
  }
  setText(text) {
    $(this.$el).setText(text)
    return this.$el
  }
}
