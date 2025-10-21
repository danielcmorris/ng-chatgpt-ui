
export interface MessageReply {
    threadId: string,
    runId: string
    markdown: string
    choices: Choice[]
}
export interface Choice {
    index: number,
    message: {
        role: string,
        content: string,
        annotations: any[]
    }
    finish_reason: string
}