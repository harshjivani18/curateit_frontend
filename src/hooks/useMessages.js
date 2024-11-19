
import { messages, labels } from "../components/dashboard/messages";

export default function useMessages() {

  function getMessage(id) {
    const message = Object.values(messages).find(value => value.id === id);

    return message ? message : id;
  }

  return { messages, labels, getMessage };
}
