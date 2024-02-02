import { useEffect, useRef, useState } from "react";
import { addNewMessage } from "~/store/user";
import { useAppDispatch, useAppSelector } from "~/store";
import { useSession } from "next-auth/react";
import { type Message } from "~/mockData/users";
import { botMessages, userMessages } from "~/mockData/conversation";
import { useRouter } from "next/navigation";


export default function Bot({ messages }: { messages: Message[] }) {
  const router=useRouter();
  const sessionData = useSession();
  const userName = sessionData.data?.user.name ?? "user";
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<string[]>([]);
  const profiles = useAppSelector((state) => state.user);
  const [recommendations, setRecommendations] = useState<number[]>([]);
  const [location,setLocation]=useState<string|undefined>();
  const [industry,setIndustry]=useState<string|undefined>();
  const [loaded,setLoaded]=useState(false);
  useEffect(() => {
    if (sessionData.status !== "loading") {
      setLoaded(true);
    }
    if (loaded) {
      if (
        messages.length === 0 ||
        messages[messages.length - 1]!.senderId !== "0"
      ) {
        let BotMessageId = 0;
        if (messages.length !== 0) {
          const lastMsg = messages[messages.length - 1]!.message;
          BotMessageId = userMessages.find((val) => val.message === lastMsg)!
            .options[0]!;
        }
        dispatch(
          addNewMessage({
            id: 0,
            message: {
              message: botMessages[BotMessageId]!.message.replace(
                "User",
                userName,
              ),
              read: false,
              senderId: "0",
              time: new Date().toUTCString(),
            },
          }),
        );
        setRecommendations([]);
      } else {
        const lastMsg = messages[messages.length - 1]!.message;
        const lastMessageOptions = botMessages.find(
          (val) => val.message.replace("User", userName) === lastMsg,
        )?.options;
        if (lastMessageOptions) {
          setOptions(
            lastMessageOptions.map((val) => userMessages[val]!.message),
          );
        }
        if (lastMsg.includes("recommendations")) {
          const loc = messages[messages.length - 2]?.message;
          const ind = messages[messages.length - 4]?.message;
          setLocation(loc);
          setIndustry(ind);
          if (!loc || !ind) {
            setRecommendations([-1]);
          } else {
            setRecommendations(() =>
              profiles
                .filter((p) => p.industry === ind && p.location === loc)
                .map((i) => i.id),
            );
          }
        }
      }
    }
  }, [dispatch, userName, sessionData, messages, profiles, loaded]);
  return (
    <div className="m-4">
      {recommendations.length !== 0 && (
        <div
          className={`rounded-3xl flex w-full flex-col space-y-2 place-self-end bg-gray-300 pb-5 pl-12 pt-5 text-sm`}
        >
          {recommendations.map((val, i) => (
            <button
              className={`w-2/5 break-words rounded-xl bg-gray-200 p-4 text-black hover:bg-gray-400`}
              key={i}
              onClick={() => {
                dispatch(
                  addNewMessage({
                    id: val,
                    message: {
                      message: `Hello ${profiles.find((v) => v.id === val)?.first_name}, I want your help regarding ${industry} in ${location}.`,
                      read: false,
                      senderId: sessionData.data?.user.id ?? "-1",
                      time: new Date().toUTCString(),
                    },
                  }),
                );
                router.push(`/messages/${val}`);
              }}
            >
              {profiles.find((v) => v.id === val)?.first_name}{" "}
              {profiles.find((v) => v.id === val)?.last_name}
            </button>
          ))}
        </div>
      )}
      {options.length !== 0 && (
        <div
          className={`rounded-3xl flex mt-2 w-full flex-row-reverse place-self-end bg-gray-50 pb-5 pr-10 pt-5 text-sm`}
        >
          <div className="w-2/5 space-y-2">
            {options.map((val, i) => (
              <button
                className={`w-full break-words rounded-xl bg-gray-500 p-4 text-gray-300 hover:bg-gray-800`}
                onClick={() => {
                  dispatch(
                    addNewMessage({
                      id: 0,
                      message: {
                        message: val,
                        read: false,
                        senderId: sessionData.data?.user.id ?? "-1",
                        time: new Date().toISOString(),
                      },
                    }),
                  );
                }}
                key={i}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
