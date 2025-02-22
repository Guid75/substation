import { useEffect } from "react"
import { RootState, useAppDispatch } from "./store";
import { getVideoFilesFromFS } from "./videos/videos.slice";
import { useSelector } from "react-redux";
import { VideoSelector } from "./videos/VideoSelector";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { SubtitleSelector } from "./details/SubtitleSelector";
import { getDetailsForVideoFile } from "./details/details.slice";

export const MainView = () => {
    const videoFiles = useSelector((state: RootState) => state.videos.files);
    const externalSubtitleFiles = useSelector((state: RootState) => state.videoDetails.externalSubtitleFiles)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getVideoFilesFromFS());
    }, [])

    useEffect(() => {
        // TODO
    }, [videoFiles])

    useEffect(() => {
        console.log(externalSubtitleFiles)
    }, [externalSubtitleFiles])


    function refreshDetailPanel(selectedIndex: number) {
        if (selectedIndex < 0) return;
        dispatch(getDetailsForVideoFile(videoFiles[selectedIndex].completePath));
    }

    return (<ResizablePanelGroup
        direction="horizontal"
        className="max-w-md rounded-lg border md:min-w-[450px]"
    >
        <ResizablePanel>
            <VideoSelector videoFiles={videoFiles} onVideoSelectionChange={refreshDetailPanel} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
            <SubtitleSelector subtitleFiles={externalSubtitleFiles} />
        </ResizablePanel>
    </ResizablePanelGroup >)
}