import * as vscode from "vscode";
import { classNames } from "./ClassNamesUtils";

export class CSSProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
    return classNames.map((className => ({ label: className, kind: vscode.CompletionItemKind.Keyword })));
  }
}