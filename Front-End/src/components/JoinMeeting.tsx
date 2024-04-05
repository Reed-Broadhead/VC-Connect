import { useEffect } from "react";
// import axios, { Axios } from "axios"
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";

export default function JoinMeeting() {
  const [meeting, initMeeting] = useDyteClient();
  

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;

    const authToken = searchParams.get("authToken");

    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the URL query to join a meeting."
      );
      return;
    }

    initMeeting({
      authToken,
    });
  }, []);

  // By default this component will cover the entire viewport.
  // To avoid that and to make it fill a parent container, pass the prop:
  // `mode="fill"` to the component.


  return (
    <DyteProvider value={meeting}>
      
      <button
        style={{ backgroundColor: "eggshell", color: "black", position: "absolute", zIndex: 100, left: 10, top: 10}}
        onClick={() => {navigator.clipboard.writeText(meeting?.meta.meetingId ?? "")}}
      >
        Copy Meeting ID
      </button>
      <DyteMeeting meeting={meeting!} />
    </DyteProvider>
  );
}
//onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
