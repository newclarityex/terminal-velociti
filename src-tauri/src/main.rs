#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn open_terminal() -> String {
    let output = Command::new("cmd")
        .args(&["/C", "echo hellooooooooo"])
        .output()
        .expect("failed to execute process");
    let hello = output.stdout;
    let x = String::from_utf8_lossy(&hello).to_string();
    x
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_terminal])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
