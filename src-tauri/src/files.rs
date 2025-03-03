use walkdir::WalkDir;
use serde::Serialize;
use std::{ env };
use std::path::Path;

#[derive(Serialize)]
pub struct FileInfo {
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
        .filter(|e| e.file_type().is_file()) {
        let complete_path = entry.path().to_string_lossy().to_string();
        if has_valid_extension(&complete_path, valid_extensions) {
            if let Some(filename) = entry.path().file_name() {
                files.push(FileInfo {
                    filename: filename.to_string_lossy().to_string(),
                    completePath: complete_path,
                });
            }
        }
    }

    files
}

pub fn find_existing_subtitles(file_path: &Path) -> Vec<FileInfo> {
    let mut existing_paths = Vec::new();

    if let Some(stem) = file_path.file_stem() {
        if let Some(parent) = file_path.parent() {
            for ext in &["srt", "sub", "ass"] {
                let candidate_path = parent.join(format!("{}.{}", stem.to_string_lossy(), ext));
                if candidate_path.exists() {
                    if let Some(filename) = candidate_path.file_name() {
                        existing_paths.push(FileInfo {
                            filename: filename.to_string_lossy().to_string(),
                            completePath: candidate_path.to_string_lossy().to_string(),
                        });
                    }
                }
            }
        }
    }

    existing_paths
}

#[tauri::command]
pub fn collect_video_files() -> Vec<FileInfo> {
    let home_dir = env::var("HOME").unwrap_or_else(|_| ".".to_string());

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
        "3g2",
    ];

    return collect_files_with_extensions(&home_dir, &valid_extensions);
}
