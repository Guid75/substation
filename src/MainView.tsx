import { useEffect } from "react"
import { RootState, useAppDispatch } from "./store";
import { getVideoFilesFromFS } from "./videos/videos.slice";
import { useSelector } from "react-redux";
import { VideoSelector } from "./videos/VideoSelector";

export const MainView = () => {
    const videoFiles = useSelector((state: RootState) => state.videos.files);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getVideoFilesFromFS());
    }, [])

    useEffect(() => {
        // TODO
    }, [videoFiles])

    return (<div><VideoSelector videoFiles={videoFiles} /></div>)
}