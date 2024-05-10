import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="sidebar"
export default class extends Controller {
    connect() {
    }

    toggle(event) {
        event.preventDefault();
        document.body.classList.toggle('toggle-sidebar')
    }
}
