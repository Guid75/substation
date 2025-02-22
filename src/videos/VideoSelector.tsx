import { DataTable, File, columns } from "@/files/FileSelector";


export const VideoSelector = ({ videoFiles, onVideoSelectionChange }: { videoFiles: File[], onVideoSelectionChange: (selectedIndex: number) => void }) => {
    return <DataTable columns={columns} data={videoFiles} onSelectionChange={onVideoSelectionChange} />
}