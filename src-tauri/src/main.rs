#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use which::which;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn run_command(command: &str) -> String {
    let output = Command::new("cmd")
        .args(&["/C", "echo", command])
        .output()
        .expect("failed to execute process");
    let hello = output.stdout;
    String::from_utf8(hello).unwrap()
}

#[tauri::command]
fn check_app(tool: &str) -> bool {
    match which(tool) {
        Ok(_) => true,
        Err(_) => false,
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_command, check_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
