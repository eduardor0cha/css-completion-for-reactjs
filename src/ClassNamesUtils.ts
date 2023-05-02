import * as vscode from "vscode";

export let classNames: string[] = [];
let watcher: vscode.FileSystemWatcher;

if (vscode.workspace.workspaceFolders !== undefined) {
    watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.workspace.workspaceFolders[0], "src/**/*"));
    watcher.onDidChange((e: vscode.Uri) => onChange(e));
    watcher.onDidCreate((e: vscode.Uri) => onChange(e));
    watcher.onDidDelete((e: vscode.Uri) => onChange(e));
}

export async function getAllClassNames() {
    classNames = [];
    let workspaceFolder = await vscode.workspace.findFiles("src/**/*.{tsx,jsx}");

    workspaceFolder.forEach(async (file) => {
        let doc = await vscode.workspace.openTextDocument(file);
        let matches = doc.getText().matchAll(/className\s*=\s*[\"{]([^\"}]*)?[\"}]/g);
        for (let match of matches) {
            let classNm = `.${match[1]}`;
            if (!classNames.includes(classNm)) { classNames.push(classNm); }
        }
    });
}

async function onChange(e: vscode.Uri) {
    getAllClassNames();
}