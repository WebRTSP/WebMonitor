import { useState } from "react";
import { useWebRTSP } from "webrtsp.react/useWebRTSP";
import { useWebRTSPHash } from "webrtsp.react/useWebRTSPHash";
import WebRTSPPlayer from "webrtsp.react/WebRTSPPlayer";

declare const STUNServer: string | undefined;
declare const WebRTSPPort: number;

const protocol = window.location.protocol === 'http:' ? "ws" : "wss";
const url = `${protocol}://${window.location.hostname}:${WebRTSPPort}/`;
const iceServers = typeof STUNServer !== 'undefined' ? [{ urls: [STUNServer] }] : undefined;

function App() {
  const hash = useWebRTSPHash();
  const [activeStreamerRev, setActiveStreamerRev] = useState<number>(0);

  const webRTSP = useWebRTSP(hash?.uri ? url : undefined, hash?.credentials);

  return (
    <main className = "min-h-svh w-full flex flex-col">
      <WebRTSPPlayer
        className = "flex-1"
        webRTSP = { webRTSP }
        uri = { hash?.uri }
        credentials = { hash?.credentials }
        revision = { activeStreamerRev }
        incActiveStreamerRev = { () => setActiveStreamerRev(activeStreamerRev + 1) }
        iceServers = { iceServers }
      />
    </main>
  )
}

export default App
