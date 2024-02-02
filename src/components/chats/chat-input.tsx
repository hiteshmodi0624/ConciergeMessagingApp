
import { type ChangeEvent, useState } from "react";
import { MdSend } from "react-icons/md";
import Input from "../ui/inputs/input";
import {addNewMessage} from "~/store/user"
import { useAppDispatch } from "~/store";
import { useSession } from "next-auth/react";
export default function ChatInput({ id }: { id: number }) {
  const sessionData=useSession();
  const [message, setMessage] = useState("");
  const dispatch=useAppDispatch();
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const onSendHandler = async () => {
    if (message.length !== 0) {
      const content = message;
      dispatch(
        addNewMessage({
          id,
          message: {
            message: content,
            read: true,
            time: new Date().toISOString(),
            senderId: sessionData.data?.user.id ?? "-1",
          },
        }),
      );
      setMessage("");
    }
  };

  return (
    <div
      className="border-seperator fixed bottom-4 m-2 flex h-min items-center 
  space-x-2 rounded-full border-[1px] bg-transparent px-4 sm:relative"
    >
      {/* <div className="left-icons flex space-x-1 text-xl">
        <MdPhoto />
      </div> */}
      <Input
        value={message}
        placeholder="Type a message"
        type="text"
        onChangeHandler={onChangeHandler}
        className="placeholder:!text-grey border-0 bg-transparent py-1"
        outerClass="!border-0 !my-3 flex"
        onEnterPress={onSendHandler}
      />
      <button
        className="left-icons flex space-x-2 text-xl"
        onClick={onSendHandler}
      >
        {message.length !== 0 && <MdSend />}
      </button>
    </div>
  );
}