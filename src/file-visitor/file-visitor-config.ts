/**
 * Configuration interface for an instance of
 * {@link FileVisitor}.
 *
 * @author  attilagyongyosi
 * @see     FileVisitor
 */
export interface FileVisitorConfig {

    /**
     * Function to call when the visitor
     * encounters a file.
     *
     * @param   file
     *          the path of the file encountered.
     */
    onFile: (file: string) => void;

    /**
     * Function to call when any error happens
     * during the recursive processing of a directory.
     *
     * @param   error
     *          the error object being thrown.
     */
    onError: (error: Error) => void;

    /**
     * Function to call when recursive structure
     * visiting is finished.
     */
    onFinish: () => void;

    /**
     * An array of strings to consider as ignored file names.
     * Primarily used for unit testing.
     */
    ignoreFiles: string[];
}
