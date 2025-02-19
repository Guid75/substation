use std::{env, fs};
use serde::Serialize;
use walkdir::WalkDir;
use std::path::Path;

#[derive(Serialize)]
struct FileInfo {
    filename: String,
    completePath: String,
}

fn has_valid_extension(file_name: &str, valid_extensions: &[&str]) -> bool {
    Path::new(file_name)
        .extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| valid_extensions.iter().any(|&e| e.eq_ignore_ascii_case(ext)))
        .unwrap_or(false)
}

fn collect_files_with_extensions(dir: &str, valid_extensions: &[&str]) -> Vec<FileInfo> {
    let mut files = Vec::new();
    
    for entry in WalkDir::new(dir)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.file_type().is_file())
    {
        let complete_path = entry.path().to_string_lossy().to_string();
        if has_valid_extension(&complete_path, valid_extensions) {
          if let Some(filename) = entry.path().file_name()  {
              files.push(FileInfo { filename: filename.to_string_lossy().to_string(), completePath: complete_path });
          }
        }
    }

    files
}

#[tauri::command]
fn collect_video_files() -> Vec<FileInfo> {
    let home_dir = env::var("HOME").unwrap_or_else(|_| ".".to_string());
    let mut results: Vec<FileInfo> = Vec::new();

    let valid_extensions = [
        "mp4",
        "mkv",
        "avi", 
        "mov", 
        "flv",
        "wmv",
        "webm",
        "m4v",
        "mpg",
        "mpeg",
        "3gp",
        "3g2"
    ];
    
    return collect_files_with_extensions(&home_dir, &valid_extensions);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![collect_video_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
