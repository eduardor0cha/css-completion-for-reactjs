import * as vscode from 'vscode';
import { getAllClassNames } from './ClassNamesUtils';
import { CSSProvider } from './CSSProvider';

export function activate(context: vscode.ExtensionContext) {
    getAllClassNames();

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("css", new CSSProvider, ".", " "));
}

export function deactivate() { }
