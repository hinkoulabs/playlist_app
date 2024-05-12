import {Notyf} from "notyf";

const Colors = {
    blue: "#0d6efd",
    red: "#dc3545"
}

const TypeMapping = {
    notice: Colors.blue,
    info: Colors.blue,
    alert: Colors.red,
    error: Colors.red
}

const notyfTypes = []

for (const [key, value] of Object.entries(TypeMapping)) {
    notyfTypes.push({
        type: key,
        background: value,
        icon: false
    })
}

const notyfOptions = {
    duration: 2000,
    position: {
        x: "right",
        y: "top"
    },
    types: notyfTypes
}

const notifier = (type, message) => {
    const notif = new Notyf(notyfOptions)
    return notif.open({ type, message });
}

export default notifier;