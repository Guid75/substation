import { DataTable, File, columns } from "@/files/FileSelector";


export const SubtitleSelector = ({ subtitleFiles }: { subtitleFiles: File[] }) => {
    return <DataTable columns={columns} data={subtitleFiles} />
}