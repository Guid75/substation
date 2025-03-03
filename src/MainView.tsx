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
    const internalSubtitles = useSelector((state: RootState) => state.videoDetails.internalSubtitles)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getVideoFilesFromFS());
    }, [])

    useEffect(() => {
        // TODO
    }, [videoFiles])

    useEffect(() => {
        // TODO
    }, [externalSubtitleFiles])

    useEffect(() => {
        // TODO
    }, [internalSubtitles])


    function refreshDetailPanel(selectedIndex: number) {
        if (selectedIndex < 0) return;
        dispatch(getDetailsForVideoFile(videoFiles[selectedIndex].completePath));
    }

    return (
        <div className="h-screen w-full flex">
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full" // max-w-md rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel className="flex-1">
                    <div className="h-full w-full overflow-auto">
                        <VideoSelector videoFiles={videoFiles} onVideoSelectionChange={refreshDetailPanel} />
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel className="flex-1">
                    <SubtitleSelector subtitleFiles={externalSubtitleFiles} />
                </ResizablePanel>
            </ResizablePanelGroup >
        </div >)
}