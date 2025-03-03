use std::{ env };
use serde::Serialize;
use std::path::Path;

mod ffmpeg;
mod files;

#[derive(Serialize)]
struct VideoFileDetails {
    externalSubtitleFiles: Vec<files::FileInfo>,
    internalSubtitles: Option<ffmpeg::FFprobeOutput>,
}

#[tauri::command]
fn get_video_file_details(file_name: &str) -> VideoFileDetails {
    let subtitle_files = files::find_existing_subtitles(Path::new(file_name));
    let json_output = match ffmpeg::extract_subtitles(file_name) {
        Ok(subtitles) => {
            // let json_output = serde_json::to_string_pretty(&subtitles).unwrap();
            // println!("{}", json_output);
            Some(subtitles)
        }
        Err(err) => {
            eprintln!("{}", err);
            None
        }
    };

    VideoFileDetails {
        externalSubtitleFiles: subtitle_files,
        internalSubtitles: json_output,
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(
            tauri::generate_handler![files::collect_video_files, get_video_file_details]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
