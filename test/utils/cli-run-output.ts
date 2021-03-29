/**
 * Simple interface describing the output of a Node.js process execution.
 * Used for integration testing based on process spawning.
 *
 * Will be deprecated in v2.2.0 as integration testing approach will
 * be changed to not rely on creating processes.
 *
 * @author  attilagyongyosi
 */
export interface RunOutput {
    code: number | null;
    stdout: string;
    stderr: string;
}
