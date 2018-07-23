export interface FileSystemWalkerConfig {
    onFileCallback: (file: string) => void;
    onErrorCallback: (error: Error) => void;
    onFinishCallback: () => void;
}
