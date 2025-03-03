use std::process::Command;
use std::io;
use serde::{ Deserialize, Serialize };

#[derive(Debug, Deserialize, Serialize)]
pub struct FFprobeOutput {
    streams: Vec<SubtitleStream>,
}

#[derive(Debug, Deserialize, Serialize)]
struct SubtitleStream {
    index: u32,
    codec_name: Option<String>,
    codec_type: String,
    disposition: Option<Disposition>,
    tags: Option<SubtitleTags>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Disposition {
    default: Option<u8>,
    forced: Option<u8>,
}

#[derive(Debug, Deserialize, Serialize)]
struct SubtitleTags {
    language: Option<String>,
    title: Option<String>,
    handler_name: Option<String>,
}

pub fn extract_subtitles(video_path: &str) -> Result<FFprobeOutput, String> {
    let output = Command::new("ffprobe")
        .args([
            "-v",
            "error",
            "-select_streams",
            "s", // select the subtitle streams
            "-show_entries",
            "stream=index,codec_name,codec_type,disposition:stream_tags",
            "-of",
            "json",
            video_path,
        ])
        .output()
        .map_err(|e| {
            if e.kind() == io::ErrorKind::NotFound {
                "ffprobe is not installed or findable".to_string()
            } else {
                format!("Error while running ffprobe : {}", e)
            }
        })?;

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout).to_string();
        serde_json
            ::from_str::<FFprobeOutput>(&stdout)
            .map_err(|e| format!("Error while parsing JSON : {}", e))
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr).to_string();
        Err(format!("Error while running ffprobe :\n{}", stderr))
    }
}
