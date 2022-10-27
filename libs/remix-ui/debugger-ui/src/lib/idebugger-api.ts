
import type { CompilationResult, CompilationSource } from '@remix-project/remix-solidity-ts' // eslint-disable-line

export interface LineColumnLocation {
    start: {
        line: number, column: number
    },
    end: {
        line: number, column: number
    }
}

export interface RawLocation {
    start: number, length: number
}

export interface Sources {
    [fileName: string] : {content: string}
}

export interface CompilationOutput {
    source: { sources: Sources, target: string }
    data: CompilationResult
    getSourceName: (id: number) => string
}

export interface Asts {
    [fileName: string] : CompilationSource // ast
}

export interface TransactionReceipt {
    blockHash: string
    blockNumber: number
    transactionHash: string
    transactionIndex: number
    from: string
    to: string
    contractAddress: string | null
  }

export type onBreakpointClearedListener = (params: string, row: number) => void
export type onBreakpointAddedListener = (params: string, row: number) => void
export type onEditorContentChanged = () => void
export type onDebugRequested = (hash: string, web3?: any) => void
export type onEnvChangedListener = (provider: string) => void

export interface IDebuggerApi {
    offsetToLineColumnConverter: { offsetToLineColumn: (sourceLocation: RawLocation, file: number, contents: Sources, asts: Asts) => Promise<LineColumnLocation> }
    removeHighlights: boolean
    onRemoveHighlights: (listener: VoidFunction) => void
    onDebugRequested: (listener: onDebugRequested) => void
    onBreakpointCleared: (listener: onBreakpointClearedListener) => void
    onBreakpointAdded: (listener: onBreakpointAddedListener) => void
    onEditorContentChanged: (listener: onEditorContentChanged) => void
    onEnvChanged: (listener: onEnvChangedListener) => void
    discardHighlight: () => Promise<void>
    highlight: (lineColumnPos: LineColumnLocation, path: string, rawLocation: any, stepDetail: any) => Promise<void>
    fetchContractAndCompile: (address: string, currentReceipt: TransactionReceipt) => Promise<CompilationOutput>
    getFile: (path: string) => Promise<string>
    setFile: (path: string, content: string) => Promise<void>
    getDebugWeb3: () => any // returns an instance of web3.js, if applicable (mainet, goerli, ...) it returns a reference to a node from devops (so we are sure debug endpoint is available)
    web3: () => any // returns an instance of web3.js
    showMessage (title: string, message: string): void
    onStartDebugging (): void // called when debug starts
    onStopDebugging (): void // called when debug stops
}

export interface DebuggerUIProps {
    debuggerAPI: IDebuggerApi
}
