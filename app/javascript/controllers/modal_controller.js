import { Controller } from "@hotwired/stimulus"
import { Modal } from "bootstrap"
export default class extends Controller {
  show(event) {
    event.preventDefault();

    let modal = document.getElementById(event.params.id)

    // update modal
    let modalBody = modal.querySelector('.modal-body')
    modalBody.innerHTML = event.params.body;

    const bModal = Modal.getInstance(modal) || new Modal(modal);
    bModal.show();
  }
}
