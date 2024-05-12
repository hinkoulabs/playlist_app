import { Controller } from "@hotwired/stimulus"
import notifier from "../notifier";

export default class extends Controller {
  connect() {
    notifier(this.element.dataset.flashType, this.element.dataset.flashMessage);

    this.element.remove()

  }
}
